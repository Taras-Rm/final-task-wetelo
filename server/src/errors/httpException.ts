import HTTP_STATUS from "../utils/httpStatusCodes";

class HttpException {
  private code;
  private message;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static getInfo(err: any) {
    const error =
      err instanceof HttpException
        ? err
        : new HttpException(HTTP_STATUS.SERVER_ERROR, err.message);

    return {
      code: error.code,
      data: {
        message: error.message,
      },
    };
  }
}

export default HttpException;
