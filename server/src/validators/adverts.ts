import { validate } from "../middlewares/validation";
import {
  descriptionValidator,
  idValidator,
  priceValidator,
  titleValidator,
} from "./common";

const createAdvertValidator = validate([
  titleValidator(),
  descriptionValidator(),
  priceValidator(),
]);

const updateAdvertValidator = validate([
  titleValidator(),
  descriptionValidator(),
  priceValidator(),
  idValidator(),
]);

const idParamValidator = validate([idValidator()]);

const deleteAdvertValidator = validate([idValidator()]);

export {
  createAdvertValidator,
  updateAdvertValidator,
  deleteAdvertValidator,
  idParamValidator,
};
