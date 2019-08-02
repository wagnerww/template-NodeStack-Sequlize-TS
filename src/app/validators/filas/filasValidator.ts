import * as Joi from "types-joi";

export const filas = Joi.object()
  .keys({
    tipo: Joi.number()
      .required()
      .error(new Error("Tipo da fila é obrigatório"), {}),
    corpoFila: Joi.object()
      .required()
      .error(new Error("Conteúdo da fila é obrigatório é obrigatório"), {})
  })
  .options({ stripUnknown: true });
