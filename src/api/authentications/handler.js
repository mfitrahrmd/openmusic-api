class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const userId = await this._usersService.verifyUserCredential(request.payload);

    const accessToken = this._tokenManager.generateAccessToken({ userId });
    const refreshToken = this._tokenManager.generateRefreshToken({ userId });

    await this._authenticationsService.addRefreshToken(refreshToken);

    return h
      .response({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      })
      .code(201);
  }

  async putAuthenticationHandler(request, h) {
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);

    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });

    return h
      .response({
        status: 'success',
        data: {
          accessToken,
        },
      })
      .code(200);
  }

  async deleteAuthenticationHandler(request, h) {
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);

    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return h
      .response({
        status: 'success',
        message: 'Refresh Token deleted',
      })
      .code(200);
  }
}

module.exports = AuthenticationsHandler;
