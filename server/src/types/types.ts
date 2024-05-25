import { Role as PrismaRole } from "@prisma/client";

export type Role = PrismaRole;

export type RegisterUser = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type UpdateUserById = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type CreateAdvert = {
  title: string;
  description?: string;
  price: number;
  userId: number;
};

export type UpdateAdvertById = {
  id: number;
  title: string;
  description?: string;
  price: number;
};
