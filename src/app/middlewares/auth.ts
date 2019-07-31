const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");
import { HttpRequest, HttpResponse, Next } from "../interfaces/HttpInterface";

module.exports = async (req: HttpRequest, res: HttpResponse, next: Next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "token não informado" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded: any = await promisify(jwt.verify)(token, authConfig.secret);
    req.usr_id = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "token inválido" });
  }
};
