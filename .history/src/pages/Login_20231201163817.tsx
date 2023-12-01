import Button from "../components/schema/Button";
import Input from "../components/schema/Input";

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4">
        <Input placeholder="Email address" />
        <Input placeholder="Password" />

        <Button fullWidth={true}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
