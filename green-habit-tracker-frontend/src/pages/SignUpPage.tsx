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
      <div className="flex flex-col md:flex-row md:w-[100%] md:h-[100%]">
        {/* Left column: Logo, title, tagline */}
        <div className="flex flex-wrap content-center flex-col md:flex-row md:justify-center md:w-[50%]">
          <span className="flex justify-center">
            <img
              src={logotype}
              alt="App logo depicting a smiling Earth with leaves as hands."
              className="w-12 h-12 md:w-32 md:h-32"
            />
          </span>
          {/* Title and tagline */}
          <div className="text-center mb-6 md:self-center md:ml-4">
            <h1 className="font-custom text-2xl text-customGreen">
              GreenHabits
            </h1>
            <h2 className="m-0 font-josefin text-sm text-customGreen">
              Every step counts for the planet
            </h2>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="md:w-[50%] flex items-center justify-center md:bg-cardWhite">
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
      </div>
    </>
  );
};
