import { body, param } from "express-validator";

const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("name must be min 3 max 100 characters");

const phoneValidator = () =>
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required")
    .matches(/^[0-9]+$/)
    .withMessage("phone should contain only numbers")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone must contain 10 numbers");

const emailValidator = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be valid email format");

const passwordValidator = () =>
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8, max: 100 })
    .withMessage("password must be min 8 max 100 characters");

const titleValidator = () =>
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("title must be min 3 max 100 characters");

const descriptionValidator = () =>
  body("description")
    .trim()
    .isLength({ max: 1000 })
    .withMessage("description must be max 1000 characters");

const priceValidator = () =>
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price should be a positive number");

const idParamValidator = () =>
  param("id").isInt().withMessage("id param should be a number");

export {
  nameValidator,
  phoneValidator,
  emailValidator,
  passwordValidator,
  idParamValidator,
  titleValidator,
  descriptionValidator,
  priceValidator,
};
