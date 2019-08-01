"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Filas = sequelize.define("Filas", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        conteudoJson: {
            type: DataTypes.STRING(10000),
            allowNull: false
        },
        qtdExecucao: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        observacao: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: "filas"
    });
    return Filas;
};
