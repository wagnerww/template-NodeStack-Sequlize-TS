import db from "../models";
import redis from "../../config/redis";
import emailService from "../services/mail";
import * as schedule from "node-schedule";

let exec = 0;
class enviarEmail {
  constructor() {}

  public enviarEmailRedis = async () => {
    await redis.smembers("sendEmail", async function(err, values) {
      if (!err)
        for (let i in values) {
          let value = values[i];
          let jsonEmail = JSON.parse(value);

          //Envia o email
          const { isEnviado, errorDescription } = await this.env(jsonEmail);

          if (isEnviado) redis.SREM("sendEmail", value);
        }
    });
  };

  public enivarEmailFilas = async () => {
    const filas = await db.Filas.findAll({ where: { tipo: 1, status: 1 } });
    const envio = await Promise.all(
      await filas.map(async fila => {
        const jsonEmail = JSON.parse(fila.conteudoJson);
        let qtdExecucao = fila.qtdExecucao + 1;
        //Envia o email
        const { isEnviado, errorDescription } = await this.enviaEmail(
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

  public enviaEmail = async jsonEmail => {
    const { assunto, destinatario, corpoEmail } = jsonEmail;

    //envia o email
    const resEmail = await emailService(
      assunto,
      destinatario,
      corpoEmail,
      "recuperacaoSenha"
    );
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
