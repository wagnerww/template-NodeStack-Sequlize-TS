import { DataTypes, QueryInterface } from "sequelize";
("use strict");

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    return queryInterface.createTable("filas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      tipo: {
        type: Sequelize.INTEGER(),
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER(),
        allowNull: false
      },
      conteudoJson: {
        type: Sequelize.STRING(10000),
        allowNull: true
      },
      qtdExecucao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      observacao: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    return queryInterface.dropTable("filas");
  }
};
