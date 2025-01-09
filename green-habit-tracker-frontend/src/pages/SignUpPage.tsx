import { useState } from "react";
import { ReusableForm } from "../components/ReusableForm";

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const handleSignUp = (email: string, password: string, name?: string) => {
    console.log("Signing up with:", email, password, name);
    // Add sign-up logic here
    // TODO:
    // 1. Send a POST request to the server with the user's email, password, and name
    // 1. Save User _id and userToken in local storage
    // 2. Redirect to the home page
  };

  return (
    <ReusableForm
      title="Create a new account"
      buttonText="Sign up"
      onSubmit={handleSignUp}
      linkText="Log in"
      linkHref="/login"
      linkDescription="Already have an account?"
      extraField={{
        label: "Name",
        placeholder: "Enter your name",
        value: name,
        onChange: setName,
      }}
    />
  );
};
