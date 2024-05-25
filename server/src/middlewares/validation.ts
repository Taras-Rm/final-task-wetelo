import { ValidationChain, validationResult } from "express-validator";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

export const validate = (validations: ValidationChain[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      throw new HttpException(HTTP_STATUS.BAD_REQUEST, errors.array()[0].msg);
    } catch (error) {
      next(error);
    }
  };
};
