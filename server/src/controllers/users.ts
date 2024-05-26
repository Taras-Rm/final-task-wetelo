import { NextFunction, Request, Response } from "express";
import usersService from "../services/users";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { RequestWithParams, RequestWithParamsAndBody } from "../types/request";
import { UpdateUserByIdModel } from "../types/models";

// get all users
const getAllUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    next(error);
  }
};

// update an user
const updateUser = async (
  req: RequestWithParamsAndBody<{ id: string }, UpdateUserByIdModel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    const user = await usersService.updateUserById({
      id: parseInt(id),
      name,
      email,
      phone,
    });

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    next(error);
  }
};

// delete an user
const deleteUser = async (
  req: RequestWithParams<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await usersService.deleteUserById(parseInt(id));

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

// verify user
const verifyUser = async (
  req: RequestWithParams<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await usersService.verifyUserById(parseInt(id));

    res.status(HTTP_STATUS.OK).send({ message: "user verified" });
  } catch (error) {
    next(error);
  }
};

// get an user
const getUser = async (
  req: RequestWithParams<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await usersService.getUserById(parseInt(id));

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export default { getAllUsers, updateUser, deleteUser, verifyUser, getUser };
