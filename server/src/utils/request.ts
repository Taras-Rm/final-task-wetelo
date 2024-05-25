import { Request } from "express";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "./httpStatusCodes";

export const getCurrentUserId = (req: Request): number => {
  const id = req.user?.id;
  if (!id) {
    throw new HttpException(HTTP_STATUS.SERVER_ERROR, "can not get user id");
  }

  return id;
};
