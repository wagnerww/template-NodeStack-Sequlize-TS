"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
exports.default = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define("Usuarios", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        avatar: {
            type: DataTypes.STRING(2000),
            allowNull: true,
            defaultValue: null
        },
        telefone: {
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: null
        },
        perfil: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: "usuarios",
        hooks: {
            beforeCreate: async (usuairo, options) => {
                usuairo.senha = await bcrypt.hash(usuairo.senha, 8);
            },
            beforeUpdate: async (usuairo, options) => {
                if (usuairo.changed("senha")) {
                    console.log("update");
                    usuairo.senha = await bcrypt.hash(usuairo.senha, 8);
                }
            }
        }
    });
    Usuarios.associate = (models) => {
        Usuarios.hasMany(models.UsuarioEnderecos, {
            as: "enderecos",
            foreignKey: "usr_id"
        });
    };
    /* Usuarios.hasMany(, {
      as: "enderecos",
      foreignKey: "usr_id"
    });*/
    return Usuarios;
};
