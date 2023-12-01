import * as yup from "yup";

const registerSchema = yup
  .object({
    username: yup.string().required("Username is required!"),
    age: yup.number().positive().integer().required(),
  })
  .required();
