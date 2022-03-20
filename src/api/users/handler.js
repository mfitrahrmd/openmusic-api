class UsersHandler {
  constructor(usersService) {
    this._usersService = usersService;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const userId = await this._usersService.addUser(request.payload);

    return h
      .response({
        status: 'success',
        data: {
          userId,
        },
      })
      .code(201);
  }
}

module.exports = UsersHandler;
