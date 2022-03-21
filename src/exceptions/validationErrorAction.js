function validationErrorAction(request, h, error) {
  if (error.isJoi) {
    return h
      .response({
        status: 'fail',
        message: error.message,
      })
      .code(400)
      .takeover();
  }
  return h.continue;
}

module.exports = validationErrorAction;
