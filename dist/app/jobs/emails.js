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
                        const enviarEmailRef = new enviarEmail();
                        //Envia o email
                        const { isEnviado, errorDescription } = await enviarEmailRef.enviaEmail(jsonEmail);
                        if (isEnviado)
                            redis_1.default.SREM("sendEmail", value);
                    }
            });
        };
        this.enivarEmailFilas = async () => {
            const filas = await models_1.default.Filas.findAll({ where: { tipo: 1, status: 1 } });
            const envio = await Promise.all(await filas.map(async (fila) => {
                const jsonEmail = fila.corpoFila;
                let qtdExecucao = fila.qtdExecucao + 1;
                const enviarEmailRef = new enviarEmail();
                //Envia o email
                const { isEnviado, errorDescription } = await enviarEmailRef.enviaEmail(jsonEmail);
                if (isEnviado) {
                    await fila.update({ status: 3, qtdExecucao });
                }
                else {
                    await fila.update({ qtdExecucao, observacao: errorDescription });
                }
            }));
        };
        this.enviaEmail = async (jsonEmail) => {
            let template = "";
            //Testa o tipo de email da fila
            /* switch (jsonEmail.email.corpoEmail) {
              case jsonEmail.email.corpoEmail.recuperacaoSenha:
                template = "recuperacaoSenha";
                break;
        
              default:
                break;
            }*/
            template = "recuperacaoSenha";
            const resEmail = await mail_1.default(jsonEmail.email, template);
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
