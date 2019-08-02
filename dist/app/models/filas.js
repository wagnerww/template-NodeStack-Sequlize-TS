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
        corpoFila: {
            type: DataTypes.VIRTUAL,
            //Do conteudoJson para o corpoFila
            get: function () {
                return this.conteudoJson ? JSON.parse(this.conteudoJson) : null;
            },
            //Do corpoFila para conteudoJson
            set: function (val) {
                this.setDataValue("conteudoJson", JSON.stringify(val));
            }
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
        /*hooks: {
          beforeValidate: async (
            fila: FilasInstance,
            options: Sequelize.CreateOptions
          ) => {
            if (fila.corpoFila) {
              console.log("chegou", fila.corpoFila);
              fila.conteudoJson = JSON.stringify(fila.corpoFila);
            }
          }
        }*/
    });
    return Filas;
};
