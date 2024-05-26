import { Role as PrismaRole } from "@prisma/client";
import { templates } from "../templates/email";

export type Role = PrismaRole;

export type RegisterUserModel = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type LoginUserModel = {
  email: string;
  password: string;
};

export type UpdateUserByIdModel = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type CreateAdvertModel = {
  title: string;
  description?: string;
  price: number;
  userId: number;
};

export type UpdateAdvertByIdModel = {
  id: number;
  title: string;
  description?: string;
  price: number;
};

export type TemplateName = keyof typeof templates;
