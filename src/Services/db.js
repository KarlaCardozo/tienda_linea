// db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: "E-commerce",
});

module.exports = pool;
