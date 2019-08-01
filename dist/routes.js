"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes = express.Router();
/*const multer = require("multer");
const multerConfig = require("./config/multer");


const authMiddleware = require("./app/middlewares/auth");*/
const usuariosController_1 = require("./app/controllers/usuariosController");
//const senhaUsuarioController = require("./app/controllers/senhaUsuarioController");
const enderecosUsuarioController_1 = require("./app/controllers/enderecosUsuarioController");
const sessaoController_1 = require("./app/controllers/sessaoController");
const agendamentoFilasController_1 = require("./app/controllers/agendamentoFilasController");
routes.get("/", (req, res) => res.send("API operando 🚀"));
routes.post("/usuarios", usuariosController_1.default.store);
routes.post("/login", sessaoController_1.default.store);
//
///* ---- RECUPERAÇÃO DE SENHA ---- */
//routes.post("/usuario/recuperarsenha", senhaUsuarioController.recuperarSenha);
//routes.post("/usuario/trocarsenha/:hash", senhaUsuarioController.trocarSenha);
//
//routes.use(authMiddleware);
routes.get("/usuarios", usuariosController_1.default.index);
//
//// Daqui para baixo, tudo é autenticado
///* ---- FILAS ---- */
routes.post("/filas", agendamentoFilasController_1.default.store);
routes.get("/filas", agendamentoFilasController_1.default.index);
///* ---- USUÁRIO ---- */
routes.put("/usuario/:id", usuariosController_1.default.update);
routes.delete("/usuario/:id", usuariosController_1.default.destroy);
routes.get("/usuario/:id", usuariosController_1.default.show);
/*routes.post(
  "/usuario/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);*/
/* ---- USUÁRIO ENDEREÇOS ---- */
// -- CRUD Endereço do usuário
routes.post("/usuario/:usr_id/endereco", enderecosUsuarioController_1.default.store);
routes.put("/usuario/:usr_id/endereco/:id", enderecosUsuarioController_1.default.update);
routes.delete("/usuario/:usr_id/endereco/:id", enderecosUsuarioController_1.default.destroy);
// -- Todos os endereços de um usuário
routes.get("/usuario/:usr_id/enderecos", enderecosUsuarioController_1.default.index);
routes.get("/usuario/:usr_id/endereco/:id", enderecosUsuarioController_1.default.show);
module.exports = routes;
