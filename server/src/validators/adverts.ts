import { validate } from "../middlewares/validation";
import {
  descriptionValidator,
  idParamValidator,
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
  idParamValidator(),
]);

const deleteAdvertValidator = validate([idParamValidator()]);

export { createAdvertValidator, updateAdvertValidator, deleteAdvertValidator };
