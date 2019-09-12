import * as Sequelize from "sequelize";

import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface ICorpoRecuperacaoSenha {
  nome: string;
  link: string;
}

export interface ITipoCorpoEmail {
  recuperacaoSenha?: ICorpoRecuperacaoSenha;
}

export interface ICorpoFilaEmail {
  destinatario: string;
  assunto: string;
  corpoEmail: ITipoCorpoEmail;
}

export interface ICorpoFila {
  email?: ICorpoFilaEmail;
  conteudoJsonRaw: string;
}

export interface IFilas {
  id?: number;
  tipo?: number;
  status?: number;
  conteudoJson?: string;
  corpoFila: ICorpoFila;
  qtdExecucao?: number;
  observacao?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FilasInstance extends Sequelize.Instance<IFilas>, IFilas {}

export interface FilasModel
  extends BaseModelInterface,
    Sequelize.Model<FilasInstance, IFilas> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): FilasModel => {
  const Filas: FilasModel = sequelize.define(
    "Filas",
    {
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
        get: function() {
          return this.conteudoJson ? JSON.parse(this.conteudoJson) : null;
        },
        //Do corpoFila para conteudoJson
        set: function(val) {
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
    },
    {
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
    }
  );

  return Filas;
};
