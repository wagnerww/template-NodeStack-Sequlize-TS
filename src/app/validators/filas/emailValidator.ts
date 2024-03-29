import * as Joi from "types-joi";

export const emailValidator = Joi.object()
  .keys({
    email: Joi.object().keys({
      destinatario: Joi.string()
        .required()
        .email()
        .error(new Error("E-mail do destinatário é obrigatório"), {}),
      assunto: Joi.string()
        .required()
        .error(new Error("assunto do email é obrigatório"), {}),
      corpoEmail: Joi.any()
        .required()
        .error(new Error("corpo do email é obrigatório"), {})
    })
  })
  .options({ stripUnknown: true });
