import * as Joi from "types-joi";

export const sessaoSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("e-mail é obrigatório"), {}),
  senha: Joi.string()
    .required()
    .error(new Error("senha é obrigatório"), {})
});
