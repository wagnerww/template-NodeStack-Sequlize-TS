require("dotenv").config();
import * as nodemailer from "nodemailer";
import * as path from "path";
import * as hbs from "nodemailer-express-handlebars";
import * as exphbs from "express-handlebars";

//send("Atleta vc está quase lá...🕵", "wagnerricardonet@gmail.com");

async function send(assunto, paraQuem, corpoEmail, templateEmail: string) {
  let isEnviado: boolean;
  let errorDescription: string = "";
  /* MAIL GUN
 var api_key = "";
  var domain = "";
  var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

  var data = {
    from: "Excited User <wagnerricardonet@gmail.com>",
    to: "wagnerricardonet@gmail.com",
    subject: "Hello",
    text: "vai"
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
  });*/

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_SENHA
    }
  });

  transporter.use(
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
  );

  try {
    let info = await transporter.sendMail({
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`, //De quem
      to: paraQuem,
      subject: assunto,

      text: corpoEmail,
      /* text: corpoEmail, //texto html, isso é um escape se o email bloquear o body do html
       html: templateEmail ? "" : corpoEmail, //corpo do html,*/
      template: templateEmail,
      context: { corpoEmail }
    });
    isEnviado = true;
  } catch (error) {
    errorDescription = `Erro ao enviar o email: ${error}`;
    isEnviado = false;
  }

  return { isEnviado, errorDescription };
}

export default send;
