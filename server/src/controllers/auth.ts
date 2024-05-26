import { NextFunction, Request, Response } from "express";
import authService from "../services/auth";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { getCurrentUserInfo } from "../utils/request";
import { RequestWithBody } from "../types/request";
import { LoginUserModel, RegisterUserModel } from "../types/models";

// register a new user
// POST api/v1/auth/register
const register = async (
  req: RequestWithBody<RegisterUserModel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, password } = req.body;

    const createdUser = await authService.registerUser({
      name,
      phone,
      email,
      password,
    });

    res.status(HTTP_STATUS.OK).json(createdUser);
  } catch (error) {
    next(error);
  }
};

// login a user
// POST api/v1/auth/login
const login = async (
  req: RequestWithBody<LoginUserModel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const loginData = await authService.loginUser({ email, password });

    res.status(HTTP_STATUS.OK).json(loginData);
  } catch (error) {
    next(error);
  }
};

// get me
// GET api/v1/auth/me
const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = getCurrentUserInfo(req);

    const user = await authService.me(userId);

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export default { register, login, me };
