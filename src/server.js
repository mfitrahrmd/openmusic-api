const Hapi = require('@hapi/hapi');
require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

const init = async () => {
  const server = Hapi.server({
    host: HOST,
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  try {
    await server.start();
    console.log(`Server running on http://${HOST}:${PORT}/`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
