export type RegisterUserDto = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type UpdateUserByIdDto = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type CreateAdvertDto = {
  title: string;
  description?: string;
  price: number;
  userId: number;
};

export type UpdateAdvertByIdDto = {
  id: number;
  title: string;
  description?: string;
  price: number;
};
