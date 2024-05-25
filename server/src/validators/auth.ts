import { validate } from "../middlewares/validation";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "./common";

const loginValidator = validate([emailValidator(), passwordValidator()]);

const registerValidator = validate([
  nameValidator(),
  phoneValidator(),
  emailValidator(),
  passwordValidator(),
]);

export { loginValidator, registerValidator };
