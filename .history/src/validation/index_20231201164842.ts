import * as yup from "yup";

const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(5, "Username should be at least 5 characters!"),
    age: yup.number().positive().integer().required(),
  })
  .required();
