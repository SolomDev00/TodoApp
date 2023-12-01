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
          {...register("username", { required: "Username is Require!" })}
        />
        <Input
          placeholder="Email address"
          {...register("email", { required: "Email is Require!" })}
        />
        <Input placeholder="Password" {...register("password")} />

        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
