import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import jwt from "jsonwebtoken";
import prisma from "../database";
import { JwtAuth } from "../types/auth";
import config from "../config";

const authorizationHeader = "authorization";

// auth middleware checks if the user can be authorized and after that add current user info in the request
const auth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const bearerStr = req.headers[authorizationHeader];
    if (!bearerStr) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "empty authorization header");
    }

    const bearerParts = bearerStr.split(" ");
    if (bearerParts.length < 2) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "invalid authorization token"
      );
    }

    let tokenData: any;
    try {
      tokenData = await jwtVerify(bearerParts[1]);
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS.NOT_AUTHORIZED,
        "invalid authorization token"
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: tokenData.id,
      },
    });

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_AUTHORIZED, "not authorized");
    }

    const baseUserInfo: JwtAuth = {
      id: tokenData.id,
      role: user.role,
      isVerified: user.isVerified,
    };

    req.user = baseUserInfo;
    next();
  } catch (error) {
    next(error);
  }
};

async function jwtVerify(token: string) {
  return new Promise((res, rej) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        rej(err);
      } else {
        res(decoded);
      }
    });
  });
}

export default auth;
