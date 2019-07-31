import db from "../models";
import {
  HttpRequestUsuario,
  HttpResponse,
  Next
} from "../interfaces/HttpInterface";
import * as bcrypt from "bcryptjs";

import response from "../../config/responsePattern";
import urlApp from "../Utils/baseurlApp";

import { usuarioStore } from "../validators/usuarioValidator";

class usuariosController {
  async index(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const usuarios = await db.Usuarios.findAll();

      await usuarios.map(async usuario => {
        usuario.avatar = await showAvatar(usuario.avatar);
      });

      response.statusCode = 200;
      response.data = usuarios;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async show(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const { id } = req.params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id";
        next(response);
        return;
      }

      const usuario = await db.Usuarios.findById(id);

      usuario.avatar = await showAvatar(usuario.avatar);

      response.statusCode = 200;
      response.data = usuario;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async store(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const { body } = req;

      const { error } = usuarioStore.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const { email } = body;
      const isExiste = await db.Usuarios.find({ where: { email } });

      if (isExiste) {
        response.statusCode = 400;
        response.message = "Já existe um usuário com este e-mail!";
        next(response);
        return;
      }

      const usuario = await db.Usuarios.create(body);

      response.statusCode = 200;
      response.data = usuario;

      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const { body, params, usr_id } = req;
      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      const usuarioUpdate = await db.Usuarios.findById(id);
      await usuarioUpdate.update(body);

      const usuario = await usuarioUpdate;

      response.statusCode = 200;
      response.data = usuario;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async destroy(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const { body, usr_id, params } = req;
      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      const usuario = await db.Usuarios.destroy({ where: { id } });

      response.statusCode = 200;
      response.data = usuario;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async storeAvatar(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    /* try {
      const pathAvatar = req.file.key;
      const { usr_id, id } = req;

      const usuario = await usuariosModel
        .query()
        .updateAndFetchById(id, { avatar: pathAvatar });

      usuario.avatar = req.file.location;

      response.statusCode = 200;
      response.data = usuario;
      next(response);
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }*/

    return;
  }
}

function showAvatar(avatar) {
  let url;
  if (avatar) {
    if (process.env.UPLOAD_METHOD === "S3") {
      url = `${process.env.URL_CLOUD_STORAGE}/${encodeURIComponent(avatar)}`;
    } else {
      url = `${urlApp}/files/${encodeURIComponent(avatar)}`;
    }
  }
  return url;
}

export default new usuariosController();
