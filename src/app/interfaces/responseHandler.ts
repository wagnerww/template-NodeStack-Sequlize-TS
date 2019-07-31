export interface IResponseHandler {
  statusCode?: number;
  data?: Object;
  details?: Object;
  message?: String;
  isSuccess?: Boolean;
}
