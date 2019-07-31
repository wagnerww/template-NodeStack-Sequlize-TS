import * as Sequelize from "sequelize";
import * as bcrypt from "bcryptjs";

export interface IUsuarios {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  avatar?: string;
  telefone?: string;
  perfil?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UsuarioInstance = Sequelize.Instance<IUsuarios> & IUsuarios;
type UsuarioModel = Sequelize.Model<UsuarioInstance, IUsuarios>;

export default function(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): UsuarioModel {
  const Usuarios = sequelize.define<UsuarioInstance, IUsuarios>(
    "Usuarios",
    {
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
    },
    {
      tableName: "usuarios",
      hooks: {
        beforeCreate: async (
          usuairo: UsuarioInstance,
          options: Sequelize.CreateOptions
        ) => {
          usuairo.senha = await bcrypt.hash(usuairo.senha, 8);
        },
        beforeUpdate: async (
          usuairo: UsuarioInstance,
          options: Sequelize.CreateOptions
        ) => {
          if (usuairo.changed("senha")) {
            console.log("update");
            usuairo.senha = await bcrypt.hash(usuairo.senha, 8);
          }
        }
      }
    }
  );

  return Usuarios;
}
