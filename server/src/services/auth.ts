import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { excludeFields } from "../utils/helper";
// import { sendVerifyUserRegistration } from "../mailSender.js";
import { LoginUserDto, RegisterUserDto } from "../types/types";
import prisma from "../database";

const registerUser = async ({
  name,
  phone,
  email,
  password,
}: RegisterUserDto) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new HttpException(
      HTTP_STATUS.BAD_REQUEST,
      `user with email: ${email} already exists`
    );
  }

  const hashedPassword = await bcrypt.hash(password, parseInt("10"));

  const createdUser = await prisma.user.create({
    data: {
      name,
      phone,
      email,
      password: hashedPassword,
    },
  });

  if (process.env.SEND_VERIFY_USER_MAIL === "true") {
    const admins = await prisma.user.findMany({ where: { role: "admin" } });

    // send verification email to admins
    // await sendVerifyUserRegistration(
    //   createdUser,
    //   admins.map((a) => a.email)
    // );
  }

  return excludeFields(createdUser, ["password"]);
};

const loginUser = async ({ email, password }: LoginUserDto) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new HttpException(
      HTTP_STATUS.BAD_REQUEST,
      `inavlid email or password`
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new HttpException(
      HTTP_STATUS.BAD_REQUEST,
      `inavlid email or password`
    );
  }

  const token = generateToken(user.id);

  return { token };
};

const generateToken = (id: number) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: process.env.TOKEN_EXP_TIME,
  });
};

const me = async (id: number | undefined) => {
  if (!id) {
    throw new HttpException(HTTP_STATUS.SERVER_ERROR, `empty id`);
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
};

export default { registerUser, loginUser, me };
