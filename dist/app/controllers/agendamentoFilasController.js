"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const responsePattern_1 = require("../../config/responsePattern");
//const redisEmail = require("./redis/redisEmail");
const filasValidator_1 = require("../validators/filasValidator");
const emailValidator_1 = require("../validators/emailValidator");
class enderecosUsuarioController {
    async index(req, res, next) {
        try {
            const filas = await models_1.default.Filas.findAll();
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = filas;
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
            const fila = await models_1.default.Filas.findById(id);
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = fila;
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
            let fila = {};
            const { error } = filasValidator_1.filas.validate(body);
            if (error) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = error.message;
                next(responsePattern_1.default);
                return;
            }
            switch (body.tipo) {
                case 1:
                    const { error } = emailValidator_1.emailValidator.validate(body.conteudoJson);
                    if (error) {
                        responsePattern_1.default.statusCode = 400;
                        responsePattern_1.default.message = error.message;
                        next(responsePattern_1.default);
                        return;
                    }
                    const isOk = false;
                    //const isOk = await redisEmail.store(body.conteudoJson);
                    if (!isOk) {
                        body.status = 1;
                        body.conteudoJson = JSON.stringify(body.conteudoJson);
                        fila = await models_1.default.Filas.create(body);
                    }
                    break;
                default:
                    break;
            }
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = fila;
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
            const { id } = params;
            if (!id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id!";
                next(responsePattern_1.default);
                return;
            }
            const fila = await models_1.default.Filas.update(body, { where: { id } });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = fila;
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
            const { id } = req.params;
            if (!id) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "É necessário informar o id e o usuário!";
                next(responsePattern_1.default);
                return;
            }
            const fila = await models_1.default.Filas.destroy({ where: { id } });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = fila;
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