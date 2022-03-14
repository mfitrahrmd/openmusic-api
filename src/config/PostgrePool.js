require('dotenv').config();
const { Pool } = require('pg');

const postgrePool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

postgrePool
  .connect()
  .then(() => console.log('Postgre Database Connected'))
  .catch((err) => console.log(err));

module.exports = postgrePool;
