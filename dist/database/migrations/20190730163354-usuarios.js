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
                type: Sequelize.STRING(200),
                allowNull: false
            },
            senha: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            perfil: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            telefone: {
                type: Sequelize.STRING(35),
                allowNull: true
            },
            avatar: {
                type: Sequelize.STRING(2000),
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("usuarios");
    }
};
