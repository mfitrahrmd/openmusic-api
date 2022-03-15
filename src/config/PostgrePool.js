require('dotenv').config();
const { nanoid } = require('nanoid');
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

postgrePool.query({ text: 'INSERT INTO albums VALUES($1, $2, $3)', values: [nanoid(16), 'Smile', 2021] });

module.exports = postgrePool;
