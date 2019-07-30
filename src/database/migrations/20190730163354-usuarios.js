const sequelize = require("sequelize");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarios", { id: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
