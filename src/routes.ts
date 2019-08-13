import * as express from "express";
const routes = express.Router();
import * as multer from "multer";
import * as multerConfig from "./config/multer";

/*const authMiddleware = require("./app/middlewares/auth");*/

import usuariosController from "./app/controllers/usuariosController";
//const senhaUsuarioController = require("./app/controllers/senhaUsuarioController");
import enderecosUsuarioController from "./app/controllers/enderecosUsuarioController";
import sessaoController from "./app/controllers/sessaoController";
import agendamentoFilasController from "./app/controllers/agendamentoFilasController";

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

///* ---- FILAS ---- */
routes.post("/filas", agendamentoFilasController.store);
routes.get("/filas", agendamentoFilasController.index);
routes.put("/fila/:id", agendamentoFilasController.update);
routes.get("/fila/:id", agendamentoFilasController.show);
routes.delete("/fila/:id", agendamentoFilasController.destroy);

///* ---- USUÁRIO ---- */
routes.put("/usuario/:id", usuariosController.update);
routes.delete("/usuario/:id", usuariosController.destroy);
routes.get("/usuario/:id", usuariosController.show);
routes.post(
  "/usuario/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

/* ---- USUÁRIO ENDEREÇOS ---- */
// -- CRUD Endereço do usuário
routes.post("/usuario/:usr_id/endereco", enderecosUsuarioController.store);
routes.put("/usuario/:usr_id/endereco/:id", enderecosUsuarioController.update);
routes.delete(
  "/usuario/:usr_id/endereco/:id",
  enderecosUsuarioController.destroy
);
// -- Todos os endereços de um usuário
routes.get("/usuario/:usr_id/enderecos", enderecosUsuarioController.index);
routes.get("/usuario/:usr_id/endereco/:id", enderecosUsuarioController.show);

module.exports = routes;
