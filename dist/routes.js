"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes = express.Router();
/*const multer = require("multer");
const multerConfig = require("./config/multer");


const authMiddleware = require("./app/middlewares/auth");*/
const usuariosController_1 = require("./app/controllers/usuariosController");
//const senhaUsuarioController = require("./app/controllers/senhaUsuarioController");
//const enderecosUsuarioController = require("./app/controllers/enderecosUsuarioController");
const sessaoController_1 = require("./app/controllers/sessaoController");
//const agendamentoFilasController = require("./app/controllers/agendamentoFilasController");*/
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
//
///* ---- FILAS ---- */
//routes.post("/filas", agendamentoFilasController.store);
//
///* ---- USUÁRIO ---- */
routes.put("/usuario/:id", usuariosController_1.default.update);
routes.delete("/usuario/:id", usuariosController_1.default.destroy);
routes.get("/usuario/:id", usuariosController_1.default.show);
//routes.post(
// "/usuario/avatar",
// multer(multerConfig).single("file"),
//  usuariosController.storeAvatar
//);
//
///* ---- USUÁRIO ENDEREÇOS ---- */
//// -- CRUD Endereço do usuário
//routes.post("/usuario/endereco", enderecosUsuarioController.store);
//routes.put("/usuario/endereco/:id", enderecosUsuarioController.update);
//routes.delete("/usuario/endereco/:id", enderecosUsuarioController.destroy);
//routes.get("/usuario/enderecos", enderecosUsuarioController.index);
//// -- Todos os endereços de um usuário
//routes.get("/usuario/enderecos/:id", enderecosUsuarioController.show);
//
module.exports = routes;
