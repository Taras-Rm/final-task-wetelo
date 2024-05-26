import { validate } from "../middlewares/validation";
import {
  emailValidator,
  idValidator,
  nameValidator,
  phoneValidator,
} from "./common";

const updateUserValidator = validate([
  nameValidator(),
  phoneValidator(),
  emailValidator(),
  idValidator(),
]);

const deleteUserValidator = validate([idValidator()]);

const verifyUserValidator = validate([idValidator()]);

const getUserValidator = validate([idValidator()]);

export {
  updateUserValidator,
  deleteUserValidator,
  verifyUserValidator,
  getUserValidator,
};
