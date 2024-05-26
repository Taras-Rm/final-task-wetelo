import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { excludeFields } from "../utils/helper";
import { LoginUserModel, RegisterUserModel } from "../types/models";
import prisma from "../database";
import config from "../config";
import { sendEmail } from "./emailSender";
import { sendMessage } from "./bot";

const registerUser = async ({
  name,
  phone,
  email,
  password,
}: RegisterUserModel) => {
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

  const hashedPassword = await bcrypt.hash(password, config.salt);

  const createdUser = await prisma.user.create({
    data: {
      name,
      phone,
      email,
      password: hashedPassword,
    },
  });

  if (config.notifyAdmins) {
    const admins = await prisma.user.findMany({ where: { role: "admin" } });

    // send verification email to admins
    admins.forEach((admin) => {
      // send email
      sendEmail({
        to: admin.email,
        subject: "New user registered",
        templateName: "verifyNewRegisteredUser",
        context: {
          name: createdUser.name,
          email: createdUser.email,
        },
      });
      // send telegram message
      admin.chatId &&
        sendMessage({
          chatId: admin.chatId,
          text: `New user *${createdUser.name}* already registered in the system with email *${createdUser.email}*. Please check and verify`,
          email: createdUser.email,
        });
    });
  }

  return excludeFields(createdUser, ["password"]);
};

const loginUser = async ({ email, password }: LoginUserModel) => {
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
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expTime,
  });
};

const me = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user && excludeFields(user, ["password"]);
};

export default { registerUser, loginUser, me };
