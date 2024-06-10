export type LoginT = {
  email: string;
  password: string;
};

export type RegistrationT = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type UpdateUserT = {
  name: string;
  phone: string;
  email: string;
};

export type RoleT = "admin" | "user";

export type UserT = {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: RoleT;
  isVerified: boolean;
  chatId?: number;
};

export type CreateAdvertT = {
  title: string;
  description: string;
  price: number;
};

export type UpdateAdvertT = {
  title: string;
  description: string;
  price: number;
};

export type AdvertT = {
  id: number;
  title: string;
  description: string;
  price: number;
  createAt: string;
  updatedAt: string;
  userId: number;
};

export type ApiErrorT = {
  message: string;
};
