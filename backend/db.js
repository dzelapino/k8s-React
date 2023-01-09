const { Pool } = require("pg");

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
const createDatabasePool = new Pool({
  ...config,
  database: "postgres",
});
const pool = new Pool(config);
(async function () {
  await createDatabasePool.query(
    `CREATE DATABASE ${process.env.POSTGRES_DATABASE}`,
    (err, result) => {
      if (!err) {
        console.log("Created database");
      } else if (err.code === "42P04") {
        console.log("Database detected");
      } else {
        console.log(err.code);
      }
    }
  );
  await createDatabasePool.end();
  // jesli nie tworzy db odkomentuj
  await pool.query(
    `
    CREATE TABLE Rock(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
      );`,
    (err, result) => {
      if (!err) {
        console.log("Created Rock table");
      } else if (err.code === "42P07") {
        console.log("Rock table detected");
      } else {
        console.log(err.code);
      }
    }
  );
})();
module.exports = pool;
