"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const responsePattern_1 = require("../../config/responsePattern");
const baseurlApp_1 = require("../Utils/baseurlApp");
const usuarioValidator_1 = require("../validators/usuarioValidator");
class usuariosController {
    async index(req, res, next) {
        try {
            const usuarios = await models_1.default.Usuarios.findAll({
                include: [{ model: models_1.default.UsuarioEnderecos }]
            });
            await usuarios.map(async (usuario) => {
                usuario.avatar = await showAvatar(usuario.avatar);
            });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = usuarios;
            next(responsePattern_1.default);
            return;
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async show(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id";
                next(responsePattern_1.default);
                return;
            }
            const usuario = await models_1.default.Usuarios.findById(id);
            usuario.avatar = await showAvatar(usuario.avatar);
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = usuario;
            next(responsePattern_1.default);
            return;
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async store(req, res, next) {
        try {
            const { body } = req;
            const { error } = usuarioValidator_1.usuarioStore.validate(body);
            if (error) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = error.message;
                next(responsePattern_1.default);
                return;
            }
            const { email } = body;
            const isExiste = await models_1.default.Usuarios.find({ where: { email } });
            if (isExiste) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "Já existe um usuário com este e-mail!";
                next(responsePattern_1.default);
                return;
            }
            const usuario = await models_1.default.Usuarios.create(body);
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = usuario;
            next(responsePattern_1.default);
            return;
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async update(req, res, next) {
        try {
            const { body, params, usr_id } = req;
            const { id } = params;
            if (!id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id!";
                next(responsePattern_1.default);
                return;
            }
            const usuarioUpdate = await models_1.default.Usuarios.findById(id);
            await usuarioUpdate.update(body);
            const usuario = await usuarioUpdate;
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = usuario;
            next(responsePattern_1.default);
            return;
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async destroy(req, res, next) {
        try {
            const { body, usr_id, params } = req;
            const { id } = params;
            if (!id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id!";
                next(responsePattern_1.default);
                return;
            }
            const usuario = await models_1.default.Usuarios.destroy({ where: { id } });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = usuario;
            next(responsePattern_1.default);
            return;
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async storeAvatar(req, res, next) {
        /* try {
          const pathAvatar = req.file.key;
          const { usr_id, id } = req;
    
          const usuario = await usuariosModel
            .query()
            .updateAndFetchById(id, { avatar: pathAvatar });
    
          usuario.avatar = req.file.location;
    
          response.statusCode = 200;
          response.data = usuario;
          next(response);
        } catch (error) {
          response.statusCode = 500;
          response.message = error.message;
          next(response);
          return;
        }*/
        return;
    }
}
function showAvatar(avatar) {
    let url;
    if (avatar) {
        if (process.env.UPLOAD_METHOD === "S3") {
            url = `${process.env.URL_CLOUD_STORAGE}/${encodeURIComponent(avatar)}`;
        }
        else {
            url = `${baseurlApp_1.default}/files/${encodeURIComponent(avatar)}`;
        }
    }
    return url;
}
exports.default = new usuariosController();
