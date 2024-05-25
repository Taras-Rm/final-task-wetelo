import HttpException from "../errors/httpException";
import { excludeFields } from "../utils/helper";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { UpdateUserByIdDto } from "../types/types";
import prisma from "../database";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({});

  const readyUsers = [];
  for (let user of users) {
    readyUsers.push(excludeFields(user, ["password"]));
  }

  return readyUsers;
};

const updateUserById = async ({
  id,
  name,
  phone,
  email,
}: UpdateUserByIdDto) => {
  const user = await prisma.user.update({
    data: {
      name,
      phone,
      email,
    },
    where: {
      id,
    },
  });

  return user;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new HttpException(
      HTTP_STATUS.NOT_FOUND,
      `user with id: ${id} not found`
    );
  }

  return excludeFields(user, ["password"]);
};

const verifyUserById = async (id: number) => {
  const userForVerify = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userForVerify) {
    throw new HttpException(
      HTTP_STATUS.NOT_FOUND,
      `user with id: ${id} not found`
    );
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
    },
  });

  return user;
};

const deleteUserById = async (id: number) => {
  const userForDelete = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userForDelete) {
    throw new HttpException(
      HTTP_STATUS.NOT_FOUND,
      `user with id: ${id} not found`
    );
  }

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user.id;
};

export default {
  getAllUsers,
  updateUserById,
  verifyUserById,
  deleteUserById,
  getUserById,
};
