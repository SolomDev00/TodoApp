export interface IRegisterInput {
  name: "username" | "email" | "password";
  placeholder: string;
  type: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}
