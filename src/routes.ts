import * as express from "express";
const routes = express.Router();
/*const multer = require("multer");
const multerConfig = require("./config/multer");


const authMiddleware = require("./app/middlewares/auth");*/

import usuariosController from "./app/controllers/usuariosController";
//const senhaUsuarioController = require("./app/controllers/senhaUsuarioController");
//const enderecosUsuarioController = require("./app/controllers/enderecosUsuarioController");
import sessaoController from "./app/controllers/sessaoController";
//const agendamentoFilasController = require("./app/controllers/agendamentoFilasController");*/

routes.get("/", (req, res) => res.send("API operando 🚀"));

routes.post("/usuarios", usuariosController.store);
routes.post("/login", sessaoController.store);
//
///* ---- RECUPERAÇÃO DE SENHA ---- */
//routes.post("/usuario/recuperarsenha", senhaUsuarioController.recuperarSenha);
//routes.post("/usuario/trocarsenha/:hash", senhaUsuarioController.trocarSenha);
//
//routes.use(authMiddleware);
routes.get("/usuarios", usuariosController.index);
//
//// Daqui para baixo, tudo é autenticado
//
///* ---- FILAS ---- */
//routes.post("/filas", agendamentoFilasController.store);
//
///* ---- USUÁRIO ---- */
routes.put("/usuario/:id", usuariosController.update);
routes.delete("/usuario/:id", usuariosController.destroy);
routes.get("/usuario/:id", usuariosController.show);
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
