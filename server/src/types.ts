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
