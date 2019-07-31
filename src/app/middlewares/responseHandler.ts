import { IResponseHandler } from "../interfaces/responseHandler";
import { HttpRequest, HttpResponse, Next } from "../interfaces/HttpInterface";

function responseHandler(
  ret: IResponseHandler,
  req: HttpRequest,
  res: HttpResponse,
  next: Next
) {
  const msgResponse: IResponseHandler = {
    isSuccess: false,
    statusCode: ret.statusCode
  };

  switch (ret.statusCode) {
    case 200:
      msgResponse.isSuccess = true;
      msgResponse.data = ret.data;
      msgResponse.details = ret.details;
      break;

    default:
      msgResponse.message = ret.message;
      break;
  }

  res.status(ret.statusCode).send(msgResponse);
  next();
}

module.exports = responseHandler;
