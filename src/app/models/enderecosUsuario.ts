import * as Sequelize from "sequelize";

export interface IUsuarioEnderecos {
  id: number;
  usr_id: number;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UsuarioEnderecosInstance = Sequelize.Instance<IUsuarioEnderecos> &
  IUsuarioEnderecos;
type UsuarioModel = Sequelize.Model<
  UsuarioEnderecosInstance,
  IUsuarioEnderecos
>;

export default function(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): UsuarioModel {
  const Usuarios = sequelize.define<
    UsuarioEnderecosInstance,
    IUsuarioEnderecos
  >(
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

  return Usuarios;
}
