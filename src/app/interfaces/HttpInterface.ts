import { Request, Response, NextFunction } from "express";
import { IUsuarios } from "../models/usuarios";
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

export interface HttpResponse extends Response {}

export interface Next extends NextFunction {}
