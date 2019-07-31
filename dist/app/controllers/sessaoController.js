"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models_1 = require("../models");
const sessaoValidator_1 = require("../validators/sessaoValidator");
const responsePattern_1 = require("../../config/responsePattern");
const auth_1 = require("../../config/auth");
class SessionController {
    async store(req, res, next) {
        const { body } = req;
        //Valida schema de dados
        const { error } = sessaoValidator_1.sessaoSchema.validate(body);
        if (error) {
            responsePattern_1.default.statusCode = 400;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
        const { email, senha } = body;
        const usuario = await models_1.default.Usuarios.findOne({ where: { email } });
        if (!usuario) {
            responsePattern_1.default.statusCode = 400;
            responsePattern_1.default.message = "usuário não encontrado";
            next(responsePattern_1.default);
            return;
        }
        const { id } = usuario;
        const senhaOk = await bcrypt.compare(senha, usuario.senha);
        if (!senhaOk) {
            responsePattern_1.default.statusCode = 400;
            responsePattern_1.default.message = "senha inválida";
            next(responsePattern_1.default);
            return;
        }
        const token = await jwt.sign({ id }, auth_1.default.secret, {
            expiresIn: auth_1.default.expired
        });
        responsePattern_1.default.statusCode = 200;
        responsePattern_1.default.data = { token: token };
        next(responsePattern_1.default);
        return;
    }
}
exports.default = new SessionController();
