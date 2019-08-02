import db from "../models";

import {
  HttpRequestSession,
  HttpResponse,
  Next
} from "../interfaces/HttpInterface";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import response from "../../config/responsePattern";
import authConfig from "../../config/auth";

import { sessaoSchema as sessaoValidator } from "../validators/sessaoValidator";

class SessionController {
  async store(req: HttpRequestSession, res: HttpResponse, next: Next) {
    const { body } = req;
    //Valida schema de dados
    const { error } = sessaoValidator.validate(body);

    if (error) {
      response.statusCode = 400;
      response.message = error.message;
      next(response);
      return;
    }

    const { email, senha } = body;

    const usuario = await db.Usuarios.findOne({ where: { email } });

    if (!usuario) {
      response.statusCode = 400;
      response.message = "usuário não encontrado";
      next(response);
      return;
    }

    const { id } = usuario;

    const senhaOk = await bcrypt.compare(senha, usuario.senha);

    if (!senhaOk) {
      response.statusCode = 400;
      response.message = "senha inválida";
      next(response);
      return;
    }

    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expired
    });

    response.statusCode = 200;
    response.data = { token: token };
    next(response);
    return;
  }
}

export default new SessionController();
