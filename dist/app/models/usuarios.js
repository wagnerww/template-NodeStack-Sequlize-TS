"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
function default_1(sequelize, DataTypes) {
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
        /* hooks: {
          beforeCreate: (
            user: UserInstance,
            options: Sequelize.CreateOptions
          ): void => {
            const salt = genSaltSync();
            user.password = hashSync(user.password, salt);
          },
          beforeUpdate: (
            user: UserInstance,
            options: Sequelize.CreateOptions
          ): void => {
            if (user.changed("password")) {
              const salt = genSaltSync();
              user.password = hashSync(user.password, salt);
            }
          }*/
    });
    /* User.associate = (models: ModelsInterface): void => {};
  
    User.prototype.isPassword = (
      encodedPassword: string,
      password: string
    ): boolean => {
      return compareSync(password, encodedPassword);
    };*/
    return Usuarios;
}
exports.default = default_1;
