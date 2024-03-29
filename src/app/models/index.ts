require("dotenv").config({});
import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";

import { ModelsInterface } from "../interfaces/ModelsInterface";

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || "development";
//let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if (!db) {
  db = {};

  /*  const operatorsAliases = {
    $in: Sequelize.Op.in
  };

  config = Object.assign({ operatorsAliases }, config);
*/
  const sequelize: Sequelize.Sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "postgres"
    }
  );

  fs.readdirSync(__dirname)
    .filter((file: string) => {
      const fileSlice: string = file.slice(-3);
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        (fileSlice === ".js" || fileSlice === ".ts")
      );
    })
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model["name"]] = model;
    });

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db["sequelize"] = sequelize;
}

export default <ModelsInterface>db;
