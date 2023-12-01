import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/schema/Button";
import Input from "../components/schema/Input";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Username"
          {...register("username", {
            required: true,
            minLength: 5,
          })}
        />
        {errors?.username && errors.username.type === "required" && (
          <InputErrorMessage msg="Username is Required!" />
        )}
        {errors?.username && errors.username.type === "minLength" && (
          <InputErrorMessage msg="Username should be at-least 5 characters!" />
        )}
        <Input
          placeholder="Email address"
          {...register("email", {
            required: "Email is Require!",
            pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
          })}
        />
        {errors?.email && errors.email.type === "required" && (
          <InputErrorMessage msg="Username is Required!" />
        )}
        {errors?.email && errors.email.type === "pattern" && (
          <InputErrorMessage msg="Username should be at-least 5 characters!" />
        )}
        <Input
          placeholder="Password"
          {...register("password", {
            required: "Password is Require!",
            maxLength: 6,
          })}
        />
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
