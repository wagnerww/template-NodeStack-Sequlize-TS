import { Request, Response, NextFunction } from "express";

export interface HttpRequest extends Request {
  usr_id?: number;
}

export interface HttpRequestUsuario extends HttpRequest {
  id: number;
}

export interface HttpResponse extends Response {}

export interface Next extends NextFunction {}
