import db from "../models";
import redis from "../../config/redis";
import emailService from "../services/mail";
import * as schedule from "node-schedule";

import { ICorpoFila } from "../models/filas";

let exec = 0;
class enviarEmail {
  constructor() {}

  public enviarEmailRedis = async () => {
    await redis.smembers("sendEmail", async function(err, values) {
      if (!err)
        for (let i in values) {
          let value = values[i];
          let jsonEmail: ICorpoFila = JSON.parse(value);
          const enviarEmailRef = new enviarEmail();
          //Envia o email
          const {
            isEnviado,
            errorDescription
          } = await enviarEmailRef.enviaEmail(jsonEmail);

          if (isEnviado) redis.SREM("sendEmail", value);
        }
    });
  };

  public enivarEmailFilas = async () => {
    const filas = await db.Filas.findAll({ where: { tipo: 1, status: 1 } });
    const envio = await Promise.all(
      await filas.map(async fila => {
        const jsonEmail: ICorpoFila = JSON.parse(fila.conteudoJson);
        let qtdExecucao = fila.qtdExecucao + 1;
        const enviarEmailRef = new enviarEmail();
        //Envia o email
        const { isEnviado, errorDescription } = await enviarEmailRef.enviaEmail(
          jsonEmail
        );
        if (isEnviado) {
          await fila.update({ status: 3, qtdExecucao });
        } else {
          await fila.update({ qtdExecucao, observacao: errorDescription });
        }
      })
    );
  };

  public enviaEmail = async (jsonEmail: ICorpoFila) => {
    let template: string = "";

    //envia o email
    /* switch (jsonEmail.email.corpoEmail) {
      case jsonEmail.email.corpoEmail.recuperacaoSenha:
        template = "recuperacaoSenha";
        break;

      default:
        break;
    }*/
    template = "recuperacaoSenha";
    const resEmail = await emailService(jsonEmail.email, template);
    const { isEnviado, errorDescription } = resEmail;
    return { isEnviado, errorDescription };
  };
}

const job = schedule.scheduleJob("0-59/5 * * * * *", async date => {
  exec += 1;
  const enviarEmailExec = new enviarEmail();
  await enviarEmailExec.enviarEmailRedis();
  await enviarEmailExec.enivarEmailFilas();

  console.log(`execução número:${exec}, hora:${date}`);
});
