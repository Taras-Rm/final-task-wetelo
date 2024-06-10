import * as Yup from "yup";

const registrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min length 3")
    .max(100, "Max length 100")
    .required("Name is required"),
  phone: Yup.string()
    .length(10, "Rhone length 10")
    .required("Phone is required"),
  email: Yup.string().email("Not valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Min length 8")
    .max(100, "Max length 100")
    .required("Password is required"),
});

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Not valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Min length 8")
    .max(100, "Max length 100")
    .required("Password is required"),
});

export { registrationValidationSchema, loginValidationSchema };
