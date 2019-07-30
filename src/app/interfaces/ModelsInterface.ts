import * as Sequelize from "sequelize";

import { UsuarioInstance, IUsuarios } from "../models/usuarios";

export interface ModelsInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Usuarios: Sequelize.Model<UsuarioInstance, IUsuarios>;
}
