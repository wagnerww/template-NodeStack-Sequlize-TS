"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("types-joi");
exports.usuarioStore = Joi.object()
    .keys({
    nome: Joi.string()
        .required()
        .error(new Error("nome é obrigatório"), {}),
    email: Joi.string()
        .email()
        .required()
        .error(new Error("e-mail é obrigatório"), {}),
    senha: Joi.string()
        .required()
        .error(new Error("senha é obrigatório"), {})
})
    .options({ stripUnknown: true });
exports.recuperarSenha = Joi.object()
    .keys({
    email: Joi.string()
        .email()
        .required()
        .error(new Error("e-mail é obrigatório"), {})
})
    .options({ stripUnknown: true });
exports.trocarSenha = Joi.object()
    .keys({
    senha: Joi.string()
        .required()
        .error(new Error("A senha é obrigatória"), {})
})
    .options({ stripUnknown: true });
