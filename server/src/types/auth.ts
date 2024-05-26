import { Role } from "./models";

export type JwtAuth = {
  id: number;
  role: Role;
  isVerified: boolean;
};
