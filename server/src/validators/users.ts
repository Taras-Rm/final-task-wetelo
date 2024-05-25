import { validate } from "../middlewares/validation";
import {
  emailValidator,
  idParamValidator,
  nameValidator,
  phoneValidator,
} from "./common";

const updateUserValidator = validate([
  nameValidator(),
  phoneValidator(),
  emailValidator(),
  idParamValidator(),
]);

const deleteUserValidator = validate([idParamValidator()]);

const verifyUserValidator = validate([idParamValidator()]);

const getUserValidator = validate([idParamValidator()]);

export {
  updateUserValidator,
  deleteUserValidator,
  verifyUserValidator,
  getUserValidator,
};
