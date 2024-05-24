import { NextFunction, Request, Response } from "express";
// import authService from "../services/auth.js";
import HTTP_STATUS from "../utils/httpStatusCodes";

// register a new user
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, email, password } = req.body;

    // const createdUser = await authService.registerUser({
    //   name,
    //   phone,
    //   email,
    //   password,
    // });

    res.status(HTTP_STATUS.OK).json("createdUser");
  } catch (error) {
    next(error);
  }
};

// login user
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // const loginData = await authService.loginUser({ email, password });

    res.status(HTTP_STATUS.OK).json("loginData");
  } catch (error) {
    next(error);
  }
};

// get me
const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = parseInt(req.user.id);

    // const user = await authService.me(userId);

    res.status(HTTP_STATUS.OK).json("user");
  } catch (error) {
    next(error);
  }
};

export default { register, login, me };
