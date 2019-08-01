import * as Sequelize from "sequelize";

import { FilasInstance, IFilas } from "../models/filas";
import { UsuarioInstance, IUsuarios } from "../models/usuarios";
import {
  UsuarioEnderecosInstance,
  IUsuarioEnderecos
} from "../models/usuarioEnderecos";

export interface ModelsInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Filas: Sequelize.Model<FilasInstance, IFilas>;
  Usuarios: Sequelize.Model<UsuarioInstance, IUsuarios>;
  UsuarioEnderecos: Sequelize.Model<
    UsuarioEnderecosInstance,
    IUsuarioEnderecos
  >;
}
