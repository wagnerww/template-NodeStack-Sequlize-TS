"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("types-joi");
exports.sessaoSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required()
        .error(new Error("e-mail é obrigatório"), {}),
    senha: Joi.string()
        .required()
        .error(new Error("senha é obrigatório"), {})
});
