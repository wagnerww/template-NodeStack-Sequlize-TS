export interface IResponseHandler {
  statusCode?: Number;
  data?: Object;
  details?: Object;
  message: String;
  isSuccess?: Boolean;
}
