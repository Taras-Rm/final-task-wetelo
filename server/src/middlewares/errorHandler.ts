import { Request, Response, NextFunction } from "express";
import HttpException from "../errors/httpException";
import logger from "../utils/logger";

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error: ", err);

  const errInfo = HttpException.getInfo(err);

  res.status(errInfo.code).json(errInfo.data);
};

export default errorHandler;
