"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const responsePattern_1 = require("../../config/responsePattern");
class enderecosUsuarioController {
    async index(req, res, next) {
        try {
            const { usr_id } = req.params;
            if (!usr_id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o usuário";
                next(responsePattern_1.default);
                return;
            }
            const enderecos = await models_1.default.UsuarioEnderecos.findAll({
                where: { usr_id }
            });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = enderecos;
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
            const { id, usr_id } = req.params;
            if (!id || !usr_id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id e o usuário";
                next(responsePattern_1.default);
                return;
            }
            const endereco = await models_1.default.UsuarioEnderecos.findOne({
                where: { id, usr_id }
            });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = endereco;
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
            const { body, params } = req;
            const { usr_id } = params;
            if (!usr_id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o usuário";
                next(responsePattern_1.default);
                return;
            }
            body.usr_id = usr_id;
            /*
            const { error } = usuarioStore.validate(body);
            if (error) {
              response.statusCode = 400;
              response.message = error.message;
              next(response);
              return;
            }*/
            const endereco = await models_1.default.UsuarioEnderecos.create(body);
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = endereco;
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
            const { body, params } = req;
            const { id, usr_id } = params;
            if (!id || !usr_id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id e o usuário!";
                next(responsePattern_1.default);
                return;
            }
            const endereco = await models_1.default.UsuarioEnderecos.update(body, {
                where: { id, usr_id }
            });
            //const endereco = await enderecoSelect.$query().updateAndFetch(body);
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = endereco;
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
            const { params } = req;
            const { id, usr_id } = params;
            if (!id || !usr_id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id e o usuário!";
                next(responsePattern_1.default);
                return;
            }
            const endereco = await models_1.default.UsuarioEnderecos.destroy({
                where: { id, usr_id }
            });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = endereco;
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
}
exports.default = new enderecosUsuarioController();
