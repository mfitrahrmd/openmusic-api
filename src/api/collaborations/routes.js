const { postCollaborationValidator, deleteCollaborationValidator } = require('../../validator/collaborations');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    config: {
      auth: 'openmusicapp_jwt',
      validate: postCollaborationValidator,
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    config: {
      auth: 'openmusicapp_jwt',
      validate: deleteCollaborationValidator,
    },
  },
];

module.exports = routes;
