import * as Yup from "yup";

const createAdvertValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Min length 3")
    .max(100, "Max length 100")
    .required("Title is required"),
  description: Yup.string().max(1000, "Max length 1000"),
  price: Yup.number()
    .moreThan(0, "Price must be more than 0")
    .required("Price is required"),
});

const editAdvertValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Min length 3")
    .max(100, "Max length 100")
    .required("Title is required"),
  description: Yup.string().max(1000, "Max length 1000"),
  price: Yup.number()
    .moreThan(0, "Price must be more than 0")
    .required("Price is required"),
});

export { createAdvertValidationSchema, editAdvertValidationSchema };
