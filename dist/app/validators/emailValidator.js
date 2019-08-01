"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("types-joi");
exports.emailValidator = Joi.object()
    .keys({
    destinatario: Joi.string()
        .required()
        .email()
        .error(new Error("E-mail do destinatário é obrigatório"), {}),
    assunto: Joi.string()
        .required()
        .error(new Error("assunto do email é obrigatório"), {}),
    corpoEmail: Joi.any()
        .required()
        .error(new Error("corpo do email é obrigatório"), {})
})
    .options({ stripUnknown: true });
