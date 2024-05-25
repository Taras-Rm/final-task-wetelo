import { Role } from "./types";

export type JwtAuth = {
  id: number;
  role: Role;
  isVerified: boolean;
};
