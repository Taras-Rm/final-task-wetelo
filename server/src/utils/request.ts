import { Request } from "express";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "./httpStatusCodes";
import { JwtAuth } from "../types/auth";

export const getCurrentUserInfo = (req: Request): JwtAuth => {
  const user = req.user;
  if (!user) {
    throw new HttpException(HTTP_STATUS.SERVER_ERROR, "can not get user info");
  }

  return user;
};
