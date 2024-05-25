import HTTP_STATUS from "../utils/httpStatusCodes.js";
import HttpException from "../errors/httpException.js";
import { NextFunction, Request, Response } from "express";

const authorizeRole =
  (roles: string[] = []) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      const role = req.user?.role;
      if (!role) {
        throw new HttpException(
          HTTP_STATUS.SERVER_ERROR,
          "can not get user role"
        );
      }

      if (!roles.includes(role)) {
        throw new HttpException(HTTP_STATUS.FORBIDDEN, "access not allowed");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default authorizeRole;
