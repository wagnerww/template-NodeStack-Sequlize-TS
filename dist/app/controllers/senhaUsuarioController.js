"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const agendamentoFilasController_1 = require("./agendamentoFilasController");
const responsePattern_1 = require("../../config/responsePattern");
const baseurlApp_1 = require("../Utils/baseurlApp");
const encryptDecryptHash_1 = require("../Utils/encryptDecryptHash");
const usuarioValidator_1 = require("../validators/usuarioValidator");
class senhaUsuarioController {
    async recuperarSenha(req, res, next) {
        try {
            const { body } = req;
            const { error } = usuarioValidator_1.recuperarSenha.validate(body);
            if (error) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = error.message;
                next(responsePattern_1.default);
                return;
            }
            const { email } = body;
            const usuario = await models_1.default.Usuarios.findOne({ where: { email } });
            if (!usuario) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = "E-mail não encontrado";
                next(responsePattern_1.default);
                return;
            }
            const hash = await encryptDecryptHash_1.default.encrypt(usuario.id);
            const recuperacaoSenha = {
                body: {
                    tipo: 1,
                    corpoFila: {
                        email: {
                            assunto: "Recuperação de senha...🕵",
                            destinatario: body.email,
                            corpoEmail: {
                                nome: usuario.nome,
                                link: `${baseurlApp_1.default}/${hash}`
                            }
                        }
                    }
                }
            };
            const retorno = {
                mensagem: "Tente novamente mais tarde."
            };
            await agendamentoFilasController_1.default.store(recuperacaoSenha, res, function (nextFilas) {
                if (nextFilas.statusCode === 200) {
                    retorno.mensagem =
                        "Foi enviado uma solicitação de troca de senha para o seu e-mail";
                }
            });
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = retorno;
            next(responsePattern_1.default);
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
    async trocarSenha(req, res, next) {
        try {
            const { body, params } = req;
            const { error } = usuarioValidator_1.trocarSenha.validate(body);
            if (error) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message = error.message;
                next(responsePattern_1.default);
                return;
            }
            const { hash } = params;
            if (!hash) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message =
                    "A troca de senha expirou, faça uma nova solicitação";
                next(responsePattern_1.default);
                return;
            }
            const { isDecrypt, textDecrypt: id } = await encryptDecryptHash_1.default.decrypt(hash);
            if (!isDecrypt) {
                responsePattern_1.default.statusCode = 400;
                responsePattern_1.default.message =
                    "Houve uma falha na troca da sua senha. Tente solicitar uma nova troca.";
                next(responsePattern_1.default);
                return;
            }
            await models_1.default.Usuarios.update(body, { where: { id } });
            const retorno = {
                mensagem: "Troca de senha realizada com sucesso"
            };
            responsePattern_1.default.statusCode = 200;
            responsePattern_1.default.data = retorno;
            next(responsePattern_1.default);
        }
        catch (error) {
            responsePattern_1.default.statusCode = 500;
            responsePattern_1.default.message = error.message;
            next(responsePattern_1.default);
            return;
        }
    }
}
exports.default = new senhaUsuarioController();
