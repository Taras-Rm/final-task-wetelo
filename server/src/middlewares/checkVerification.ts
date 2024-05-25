import HTTP_STATUS from "../utils/httpStatusCodes";
import HttpException from "../errors/httpException";
import { NextFunction, Request, Response } from "express";

const checkVerification = (req: Request, res: Response, next: NextFunction) => {
  try {
    const isVerified = req.user?.isVerified;
    if (typeof isVerified === "undefined") {
      throw new HttpException(
        HTTP_STATUS.SERVER_ERROR,
        "can not get isVerified user field"
      );
    }

    if (!isVerified) {
      throw new HttpException(HTTP_STATUS.FORBIDDEN, "not verified yet");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkVerification;
