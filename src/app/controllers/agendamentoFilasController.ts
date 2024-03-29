import db from "../models";
import {
  HttpRequestFilas,
  HttpResponse,
  Next
} from "../interfaces/HttpInterface";
import response from "../../config/responsePattern";
import redisEmail from "./redis/redisEmail";

import { filas } from "../validators/filas/filasValidator";

import { emailValidator } from "../validators/filas/emailValidator";

class enderecosUsuarioController {
  async index(req: HttpRequestFilas, res: HttpResponse, next: Next) {
    try {
      const filas = await db.Filas.findAll();

      response.statusCode = 200;
      response.data = filas;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async show(req: HttpRequestFilas, res: HttpResponse, next: Next) {
    try {
      const { id } = req.params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id";
        next(response);
        return;
      }

      const fila = await db.Filas.findById(id);

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async store(req: HttpRequestFilas, res: HttpResponse, next: Next) {
    try {
      const { body } = req;
      let fila = {};

      const { error } = filas.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      switch (body.tipo) {
        case 1:
          const { error } = emailValidator.validate(body.corpoFila);

          if (error) {
            response.statusCode = 400;
            response.message = error.message;
            next(response);
            return;
          }

          const isOk: boolean = await redisEmail.store(body.corpoFila);
          if (!isOk) {
            body.status = 1;

            fila = await db.Filas.create(body);
          }
          break;

        default:
          break;
      }

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(req: HttpRequestFilas, res: HttpResponse, next: Next) {
    try {
      const { body, params } = req;
      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      const fila = await db.Filas.update(body, { where: { id } });

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async destroy(req: HttpRequestFilas, res: HttpResponse, next: Next) {
    try {
      const { id } = req.params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const fila = await db.Filas.destroy({ where: { id } });

      response.statusCode = 200;
      response.data = fila;
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
