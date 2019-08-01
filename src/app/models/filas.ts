import * as Sequelize from "sequelize";

import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface IConteudoJSONEmail {
  destinatario: string;
  assunto: string;
  corpoEmail: string;
}

export interface IConteudoJSON {
  Email?: IConteudoJSONEmail;
}

export interface IFilas {
  id?: number;
  tipo?: number;
  status?: number;
  conteudoJson?: IConteudoJSON;
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
    }
  );

  return Filas;
};
