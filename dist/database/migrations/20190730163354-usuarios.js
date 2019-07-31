"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
module.exports = {
    up: (queryInterface, Sequelize) => {
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
            avatar: {
                type: Sequelize.STRING(2000)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("usuarios");
    }
};
