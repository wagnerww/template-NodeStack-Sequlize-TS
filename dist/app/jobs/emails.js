"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const redis_1 = require("../../config/redis");
const mail_1 = require("../services/mail");
const schedule = require("node-schedule");
let exec = 0;
class enviarEmail {
    constructor() {
        this.enviarEmailRedis = async () => {
            await redis_1.default.smembers("sendEmail", async function (err, values) {
                if (!err)
                    for (let i in values) {
                        let value = values[i];
                        let jsonEmail = JSON.parse(value);
                        //Envia o email
                        const { isEnviado, errorDescription } = await this.env(jsonEmail);
                        if (isEnviado)
                            redis_1.default.SREM("sendEmail", value);
                    }
            });
        };
        this.enivarEmailFilas = async () => {
            const filas = await models_1.default.Filas.findAll({ where: { tipo: 1, status: 1 } });
            const envio = await Promise.all(await filas.map(async (fila) => {
                const jsonEmail = JSON.parse(fila.conteudoJson);
                let qtdExecucao = fila.qtdExecucao + 1;
                //Envia o email
                const { isEnviado, errorDescription } = await this.enviaEmail(jsonEmail);
                if (isEnviado) {
                    await fila.update({ status: 3, qtdExecucao });
                }
                else {
                    await fila.update({ qtdExecucao, observacao: errorDescription });
                }
            }));
        };
        this.enviaEmail = async (jsonEmail) => {
            const { assunto, destinatario, corpoEmail } = jsonEmail;
            //envia o email
            const resEmail = await mail_1.default(assunto, destinatario, corpoEmail, "recuperacaoSenha");
            const { isEnviado, errorDescription } = resEmail;
            return { isEnviado, errorDescription };
        };
    }
}
const job = schedule.scheduleJob("0-59/5 * * * * *", async (date) => {
    exec += 1;
    const enviarEmailExec = new enviarEmail();
    await enviarEmailExec.enviarEmailRedis();
    await enviarEmailExec.enivarEmailFilas();
    console.log(`execução número:${exec}, hora:${date}`);
});
