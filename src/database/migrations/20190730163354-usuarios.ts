import { DataTypes, QueryInterface } from "sequelize";
("use strict");

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    return queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(200)
      },
      senha: {
        type: Sequelize.STRING(150)
      },
      telefone: {
        type: Sequelize.STRING(35)
      },
      avatar: {
        type: Sequelize.STRING(2000)
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    return queryInterface.dropTable("usuarios");
  }
};
