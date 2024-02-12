import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
// import { url } from 'inspector';
import { readdirSync } from "fs";
import { basename, dirname } from "path";
import { DataTypes } from "sequelize";
import { fileURLToPath } from 'url';
// import database from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.js')[env];



const db = {};
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

let sequelize;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}` 
// ?options=project%3D${ENDPOINT_ID}&sslmode=require`;

sequelize = new Sequelize(URL, {
  dialect: 'postgres',
  Option: {
    native: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // very important
      }
    }

  },
});
// if (config.use_env_variable) {
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config,
//   );
// }

const files = readdirSync(__dirname)
.filter(
  (file) => file.indexOf('.') !== 0
  && file !== basename(__filename)
  && file.slice(-3) === '.js',
);

for await (const file of files) {
const model = await import(`./${file}`);
const namedModel = model.default(sequelize, DataTypes);
db[namedModel.name] = namedModel;
}

Object.keys(db).forEach((modelName) => {
if (db[modelName].associate) {
  db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test()