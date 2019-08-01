"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("types-joi");
exports.filas = Joi.object()
    .keys({
    tipo: Joi.number()
        .required()
        .error(new Error("Tipo da fila é obrigatório"), {}),
    conteudoJson: Joi.object()
        .required()
        .error(new Error("Conteúdo da fila é obrigatório é obrigatório"), {})
})
    .options({ stripUnknown: true });
