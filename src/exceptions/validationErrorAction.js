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
  return h
    .response({
      status: 'error',
      message: "Sorry, we've encountered an unexpected error. Please try again later.",
    })
    .code(500);
}

module.exports = validationErrorAction;
