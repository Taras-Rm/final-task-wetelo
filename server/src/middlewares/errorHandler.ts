import { Request, Response, NextFunction } from "express";
import HttpException from "../errors/httpException";

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const errInfo = HttpException.getInfo(err);

  res.status(errInfo.code).json(errInfo.data);
};

export default errorHandler;
