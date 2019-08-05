"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../config/redis");
class redisEmailController {
    /* async index(req, res, next) {
      try {
        const filas = await filasModel.query().select();
  
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
    }*/
    async store(conteudo) {
        const value = JSON.stringify(conteudo);
        const redisError = await redis_1.default.SADD("sendEmail", value, function (err, success) {
            if (err) {
                const retorno = {
                    mensagem: `Falha ao enviar email para a fila: ${err}`
                };
            }
            else {
                console.log("sucesso", success);
            }
        });
        return redisError;
    }
}
exports.default = new redisEmailController();
