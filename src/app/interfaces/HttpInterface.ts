import { Request, Response, NextFunction } from "express";
import { IFilas } from "../models/filas";
import { IUsuarios } from "../models/usuarios";
import { IUsuarioEnderecos } from "../models/usuarioEnderecos";
import { IAuth } from "./AuthInterface";

export interface HttpRequest extends Request {
  usr_id?: number;
}

export interface HttpRequestSession extends HttpRequest {
  body: IAuth;
}

export interface HttpRequestUsuario extends HttpRequest {
  params: {
    id: number;
  };
  body: IUsuarios;
}

export interface HttpRequestUsuarioEnderecos extends HttpRequest {
  params: {
    usr_id: number;
    id?: number;
  };
  body: IUsuarioEnderecos;
}

export interface HttpRequestFilas extends HttpRequest {
  params: {
    id: number;
  };
  body: IFilas;
}

export interface HttpRequestRecuperacaoSenha extends HttpRequest {
  params: {
    hash: string;
  };
  body: IUsuarios;
}

export interface HttpResponse extends Response {}

export interface Next extends NextFunction {}
