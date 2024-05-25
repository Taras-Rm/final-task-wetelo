import { JwtAuth } from "./types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: JwtAuth;
    }
  }
}
