import * as Sequelize from "sequelize";
//import { genSaltSync, hashSync, compareSync } from "bcryptjs";

import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface IUsuarios {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UsuarioInstance
  extends Sequelize.Instance<IUsuarios>,
    IUsuarios {
  //isPassword(encodedPassword: string, password: string): boolean;
}

export interface UsuariosModel
  extends BaseModelInterface,
    Sequelize.Model<UsuarioInstance, IUsuarios> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): UsuariosModel => {
  const User: UsuariosModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: DataTypes.BLOB({
          length: "long"
        }),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      tableName: "users"
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

  return User;
};
