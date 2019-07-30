import Sequelize from "sequelize";
import { initProduct } from "./usuarios";
import { initManufacturer } from "./manufacturer";

const env = process.env.NODE_ENV || "development";
const config = require("/../config.json")[env];
const url = config.url || process.env.DATABSE_CONNECTION_URI;

const sequelize = new Sequelize(url, config);

const db = {
  sequelize,
  Sequelize,
  Manufacturer: initManufacturer(sequelize),
  Product: initProduct(sequelize)
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
