"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const nodemailer = require("nodemailer");
async function send(dadosEmail, templateEmail) {
    const { assunto, destinatario, corpoEmail } = dadosEmail;
    let isEnviado;
    let errorDescription = "";
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_SENHA
        }
    });
    /* transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: path.resolve(__dirname, "..", "views"),
          layoutsDir: path.resolve(__dirname, "..", "views"),
          defaultLayout: `${templateEmail}.hbs`
        },
        viewPath: path.resolve(__dirname, "..", "views"),
        extName: ".hbs"
      })
    );*/
    try {
        let info = await transporter.sendMail({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
            to: destinatario,
            subject: assunto,
            text: corpoEmail.recuperacaoSenha.nome //texto html, isso é um escape se o email bloquear o body do html
            //  html: templateEmail //? "" : corpoEmail, //corpo do html,*/
            //template: templateEmail,
            //context: { corpoEmail }
        });
        isEnviado = true;
    }
    catch (error) {
        errorDescription = `Erro ao enviar o email: ${error}`;
        isEnviado = false;
    }
    return { isEnviado, errorDescription };
}
exports.default = send;
