import { useState } from "react";
import { ReusableForm } from "../components/ReusableForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignUp = async (
    email: string,
    password: string,
    name?: string
  ) => {
    // e.preventDefault();

    const userData = { email, password, name };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/add`,
        userData
      );
      console.log("User added:", response.data);

      // Set UserID and UserToken in local storage
      localStorage.setItem("userID", response.data.userID);
      localStorage.setItem("userToken", response.data.userToken);
      // Redirect to the home page in React
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error adding user:", error);
    }
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
