import * as Sequelize from "sequelize";

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
      tableName: "usuarios"
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
    }
  );

  /* User.associate = (models: ModelsInterface): void => {};

  User.prototype.isPassword = (
    encodedPassword: string,
    password: string
  ): boolean => {
    return compareSync(password, encodedPassword);
  };*/

  return Usuarios;
}
