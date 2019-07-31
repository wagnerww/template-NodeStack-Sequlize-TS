"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("usuario_enderecos", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            usr_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "usuarios",
                    key: "id"
                },
                primaryKey: true
            },
            endereco: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            numero: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            bairro: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            cidade: {
                type: Sequelize.STRING(300),
                allowNull: false
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
        return queryInterface.dropTable("usuario_enderecos");
    }
};
