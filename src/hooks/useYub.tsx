import { useState } from "react";
import { ValidationError } from "yup";
import { todoSchema } from "../validation";

interface Todo {
  title: string;
  description: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface TodoValidation {
  errors: ValidationErrors;
  validateTodo: (todoData: Todo) => Promise<void>;
}

const useYub = (): TodoValidation => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateTodo = async (todoData: Todo): Promise<void> => {
    try {
      await todoSchema.validate(todoData, { abortEarly: false });
      setErrors({});
    } catch (validationErrors: unknown) {
      if (validationErrors instanceof ValidationError) {
        const errorsObj: ValidationErrors = {};
        (validationErrors.inner as ValidationError[]).forEach(
          (error: ValidationError) => {
            const path: string = error.path as string;
            errorsObj[path] = error.message;
          }
        );
        setErrors(errorsObj);
      } else {
        throw validationErrors; // rethrow if it's not a ValidationError
      }
    }
  };

  return { errors, validateTodo };
};

export default useYub;
