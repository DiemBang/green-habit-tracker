import { ReusableForm } from "../components/ReusableForm";

export const SignUpPage: React.FC = () => {
  const handleSignUp = (email: string, password: string) => {
    console.log("Signing up with:", email, password);
    // Add sign-up logic here
  };

  return (
    <ReusableForm
      title="Create a new account"
      buttonText="Sign up"
      onSubmit={handleSignUp}
      linkText="Log in"
      linkHref="/login"
      linkDescription="Already have an account?"
    />
  );
};
