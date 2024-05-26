import HTTP_STATUS from "../utils/httpStatusCodes";
import HttpException from "../errors/httpException";
import { NextFunction, Request, Response } from "express";
import { getCurrentUserInfo } from "../utils/request";

// checkVerification middleware checks if the current user is verified
const checkVerification = (req: Request, _: Response, next: NextFunction) => {
  try {
    const { isVerified } = getCurrentUserInfo(req);

    if (!isVerified) {
      throw new HttpException(HTTP_STATUS.FORBIDDEN, "user not verified yet");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkVerification;
