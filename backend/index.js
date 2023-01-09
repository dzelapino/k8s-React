const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const { createClient } = require("redis");
const { Sequelize, Model, DataTypes } = require('sequelize');

(async () => {

  const dbConnData = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  };

  const host = dbConnData.host;
  const port = dbConnData.port;

  const sequelize = new Sequelize(dbConnData.database, dbConnData.user, dbConnData.password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })


  const Rock = sequelize.define("Rock", {
    name: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
  },
    {
      freezeTableName: true,
      // tableName: "Rock",
    });


  // jesli nie tworzy db zakomentuj try i zawartosc
  try {
    await sequelize.authenticate();
    console.log('Sequelizeonnection has been established successfully.');
    await Rock.sync();
    console.log("Sequelize sees Rock table!")
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log("--------------------")
  console.log(dbConnData)
  console.log("--------------------")

  const redisClient = createClient({
    url: `redis://:@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
  const redisDefaultExpiration = process.env.REDIS_DEFAULT_EXPIRATION;

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();

  app.use(cors());
  app.use(express.json());

  app.get("/backendTest", async (req, res) => {
    try {
      res.send("Backend is working fine");
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get("/rocksBasic", async (req, res) => {
    try {
      const allUsers = await getOrSetCache("rocksBasic", async () => {
        const allUsers = await pool.query("SELECT * FROM Rock");
        return allUsers.rows;
      });
      res.send(allUsers);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  app.get("/rocks", async (req, res) => {
    try {
      const allRocks = await getOrSetCache("rocks", async () => {
        const allRocks = Rock.findAll()
        return allRocks
      });
      res.send(allRocks);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.post("/rocks", async (req, res) => {
    try {
      const name = req.body.name
      const color = req.body.color
      const newRock = await Rock.create({ name, color })
      const redisData = JSON.parse(await redisClient.get("rocks"));
      if (redisData) {
        const updatedRedisData = [...redisData, newRock];
        await redisClient.set("rocks", JSON.stringify(updatedRedisData), {
          EX: redisDefaultExpiration,
        });
      }
      res.send(newRock);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get("/rocks/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const rock = await getOrSetCache(`rock:${id}`, async () => {
        const rock = await Rock.findOne({ where: { id: id } });
        return rock;
      });
      res.send(rock);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  const getOrSetCache = (key, callback) => {
    return new Promise(async (resolve, reject) => {
      try {
        const redisData = await redisClient.get(key);
        if (redisData != null) return resolve(JSON.parse(redisData));
        const freshData = await callback();
        freshData &&
          redisClient.set(key, JSON.stringify(freshData), {
            EX: redisDefaultExpiration,
          });
        resolve(freshData);
      } catch (err) {
        return reject(err);
      }
    });
  };

  app.listen(8080, () => {
    console.log("Backend work work");
  });
})();
