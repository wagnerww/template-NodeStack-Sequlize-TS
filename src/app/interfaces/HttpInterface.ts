import { Request } from "express";

export interface Request extends Request {
  id_usr?: Number;
}
