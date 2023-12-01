import * as yup from "yup";

const registerSchema = yup
  .object({
    username: yup.string().required("Username is required!").min(5),
    age: yup.number().positive().integer().required(),
  })
  .required();
