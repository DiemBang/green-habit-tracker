import { useState } from "react";
import { ReusableForm } from "../components/ReusableForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logotype from "/src/assets/greenhabit-logo.svg";

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
        userData,
        { withCredentials: true }
      );

      // Set UserID and UserToken in local storage
      localStorage.setItem("userID", response.data.userID);
      localStorage.setItem("userToken", response.data.userToken);
      // Redirect to the tutorial page
      navigate("/tutorial", { replace: true });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap content-center flex-col basis-full">
        <span>
          <img
            src={logotype}
            alt="App logo depicting a smiling Earth with leaves as hands."
            width="48"
            height="48"
          />
        </span>
        {/* Title and tagline - Full width but centered text */}
        <div className="text-center mb-6 basis-full">
          <h1 className="font-custom text-2xl text-customGreen">GreenHabits</h1>
          <h2 className="m-0 font-josefin text-sm text-customGreen">
            Every step counts for the planet
          </h2>
        </div>
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
      </div>
    </>
  );
};
