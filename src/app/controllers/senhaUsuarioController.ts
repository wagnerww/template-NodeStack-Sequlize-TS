import db from "../models";

import {
  HttpRequestRecuperacaoSenha,
  HttpRequestFilas,
  HttpResponse,
  Next
} from "../interfaces/HttpInterface";

import { IResponseHandler } from "../interfaces/responseHandler";
import { ICorpoFila, ITipoCorpoEmail } from "../models/filas";

import agendamentoFilasController from "./agendamentoFilasController";
import response from "../../config/responsePattern";
import urlApp from "../Utils/baseurlApp";
import encryptDecrypt from "../Utils/encryptDecryptHash";

import { recuperarSenha, trocarSenha } from "../validators/usuarioValidator";

class senhaUsuarioController {
  async recuperarSenha(
    req: HttpRequestRecuperacaoSenha,
    res: HttpResponse,
    next: Next
  ) {
    try {
      const { body } = req;

      const { error } = recuperarSenha.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const { email } = body;
      const usuario = await db.Usuarios.findOne({ where: { email } });

      if (!usuario) {
        response.statusCode = 400;
        response.message = "E-mail não encontrado";
        next(response);
        return;
      }

      const hash = await encryptDecrypt.encrypt(usuario.id);

      const recuperacaoSenha = <HttpRequestFilas>{
        body: {
          tipo: 1,
          corpoFila: <ICorpoFila>{
            email: {
              assunto: "Recuperação de senha...🕵",
              destinatario: body.email,
              corpoEmail: <ITipoCorpoEmail>{
                recuperacaoSenha: {
                  nome: usuario.nome,
                  link: `${urlApp}/${hash}`
                }
              }
            }
          }
        }
      };

      const retorno = {
        mensagem: "Tente novamente mais tarde."
      };

      await agendamentoFilasController.store(recuperacaoSenha, res, function(
        nextFilas: IResponseHandler
      ) {
        if (nextFilas.statusCode === 200) {
          retorno.mensagem =
            "Foi enviado uma solicitação de troca de senha para o seu e-mail";
        }
      });

      response.statusCode = 200;
      response.data = retorno;
      next(response);
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async trocarSenha(
    req: HttpRequestRecuperacaoSenha,
    res: HttpResponse,
    next: Next
  ) {
    try {
      const { body, params } = req;

      const { error } = trocarSenha.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const { hash } = params;

      if (!hash) {
        response.statusCode = 400;
        response.message =
          "A troca de senha expirou, faça uma nova solicitação";
        next(response);
        return;
      }

      const { isDecrypt, textDecrypt: id } = await encryptDecrypt.decrypt(hash);

      if (!isDecrypt) {
        response.statusCode = 400;
        response.message =
          "Houve uma falha na troca da sua senha. Tente solicitar uma nova troca.";
        next(response);
        return;
      }

      const usuarioUpdate = await db.Usuarios.findById(id);
      await usuarioUpdate.update(body);
      await usuarioUpdate;

      const retorno = {
        mensagem: "Troca de senha realizada com sucesso"
      };

      response.statusCode = 200;
      response.data = retorno;
      next(response);
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }
}

export default new senhaUsuarioController();
