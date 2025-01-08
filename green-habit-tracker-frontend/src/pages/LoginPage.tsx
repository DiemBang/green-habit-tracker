import { ReusableForm } from "../components/ReusableForm";

export const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with:", email, password);
    // Add login logic here
  };

  return (
    <ReusableForm
      title="Log in to your account"
      buttonText="Log in"
      onSubmit={handleLogin}
      linkText="Sign up"
      linkHref="/signup"
      linkDescription="Don't have an account?"
    />
  );
};
