import * as Sequelize from "sequelize";

import { UsuarioInstance, IUsuarios } from "../models/usuarios";
import {
  UsuarioEnderecosInstance,
  IUsuarioEnderecos
} from "../models/usuarioEnderecos";

export interface ModelsInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Usuarios: Sequelize.Model<UsuarioInstance, IUsuarios>;
  UsuarioEnderecos: Sequelize.Model<
    UsuarioEnderecosInstance,
    IUsuarioEnderecos
  >;
}
