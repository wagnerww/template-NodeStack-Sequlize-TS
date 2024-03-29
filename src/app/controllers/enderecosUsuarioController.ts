import db from "../models";

import {
  HttpRequestUsuarioEnderecos,
  HttpResponse,
  Next
} from "../interfaces/HttpInterface";

import response from "../../config/responsePattern";

class enderecosUsuarioController {
  async index(req: HttpRequestUsuarioEnderecos, res: HttpResponse, next: Next) {
    try {
      const { usr_id } = req.params;

      if (!usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o usuário";
        next(response);
        return;
      }

      const enderecos = await db.UsuarioEnderecos.findAll({
        where: { usr_id }
      });

      response.statusCode = 200;
      response.data = enderecos;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async show(req: HttpRequestUsuarioEnderecos, res: HttpResponse, next: Next) {
    try {
      const { id, usr_id } = req.params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário";
        next(response);
        return;
      }

      const endereco = await db.UsuarioEnderecos.findOne({
        where: { id, usr_id }
      });

      response.statusCode = 200;
      response.data = endereco;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async store(req: HttpRequestUsuarioEnderecos, res: HttpResponse, next: Next) {
    try {
      const { body, params } = req;
      const { usr_id } = params;

      if (!usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o usuário";
        next(response);
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

      const endereco = await db.UsuarioEnderecos.create(body);

      response.statusCode = 200;
      response.data = endereco;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(
    req: HttpRequestUsuarioEnderecos,
    res: HttpResponse,
    next: Next
  ) {
    try {
      const { body, params } = req;
      const { id, usr_id } = params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const endereco = await db.UsuarioEnderecos.update(body, {
        where: { id, usr_id }
      });

      //const endereco = await enderecoSelect.$query().updateAndFetch(body);

      response.statusCode = 200;
      response.data = endereco;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async destroy(
    req: HttpRequestUsuarioEnderecos,
    res: HttpResponse,
    next: Next
  ) {
    try {
      const { params } = req;
      const { id, usr_id } = params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const endereco = await db.UsuarioEnderecos.destroy({
        where: { id, usr_id }
      });

      response.statusCode = 200;
      response.data = endereco;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }
}

export default new enderecosUsuarioController();
