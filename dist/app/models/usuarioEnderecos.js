"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const UsuarioEndereco = sequelize.define("UsuarioEnderecos", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        endereco: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        bairro: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        },
        cidade: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: "usuario_enderecos"
    });
    UsuarioEndereco.associate = (models) => {
        UsuarioEndereco.belongsTo(models.Usuarios, {
            foreignKey: {
                allowNull: false,
                field: "usr_id",
                name: "usr_id"
            }
        });
    };
    return UsuarioEndereco;
};
