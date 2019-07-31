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
      const { id } = req;

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
      console.log("chegou");
      const { body } = req;

      const { error } = usuarioStore.validate(body);
      console.log("ate aqui o k");
      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }
      console.log("ate aqui o k 2");
      const { email } = body;
      const isExiste = await db.Usuarios.find({ where: { email } });

      console.log("ate aqui o k 3", isExiste);
      if (isExiste) {
        response.statusCode = 400;
        response.message = "Já existe um usuário com este e-mail!";
        next(response);
        return;
      }
      console.log("ate aqui ok");
      //body.senha = await bcrypt.hash(body.senha, 8);

      const usuario = await db.Usuarios.create(body);

      response.statusCode = 200;
      response.data = usuario;
      console.log("chegou no fim");
      next(response);
      return;
    } catch (error) {
      console.log("erro", error);
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(req: HttpRequestUsuario, res: HttpResponse, next: Next) {
    try {
      const { body, params, usr_id, id } = req;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      if (body.senha) {
        body.senha = await bcrypt.hash(body.senha, 8);
      }

      const usuario = await db.Usuarios.update(body, { where: { id } });

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
      const { body, usr_id, id } = req;

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
  if (process.env.UPLOAD_METHOD === "S3") {
    url = `${process.env.URL_CLOUD_STORAGE}/${encodeURIComponent(avatar)}`;
  } else {
    url = `${urlApp}/files/${encodeURIComponent(avatar)}`;
  }
  return url;
}

module.exports = new usuariosController();
