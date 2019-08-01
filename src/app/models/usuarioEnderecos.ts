import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface IUsuarioEnderecos {
  id: number;
  usr_id: number;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  createdAt?: string;
  updatedAt?: string;
  //usuario: ;
}

export interface UsuarioEnderecosInstance
  extends Sequelize.Instance<IUsuarioEnderecos>,
    IUsuarioEnderecos {}

export interface UsuarioEnderecosModel
  extends BaseModelInterface,
    Sequelize.Model<UsuarioEnderecosInstance, IUsuarioEnderecos> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): UsuarioEnderecosModel => {
  const UsuarioEndereco: UsuarioEnderecosModel = sequelize.define(
    "UsuarioEnderecos",
    {
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
    },
    {
      tableName: "usuario_enderecos"
    }
  );

  UsuarioEndereco.associate = (models: ModelsInterface) => {
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
