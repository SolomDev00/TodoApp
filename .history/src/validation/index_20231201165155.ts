import * as yup from "yup";

const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(5, "Username should be at least 5 characters!"),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 5 characters!"),
  })
  .required();

export default registerSchema;