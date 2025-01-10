import axios from "axios";
import { ReusableForm } from "../components/ReusableForm";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  let navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<any> => {
    const userData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userData
      );
      console.log("User logged in:", response.data);

      // Set userID and userToken in local storage
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
      title="Log in to your account"
      buttonText="Log in"
      onSubmit={handleLogin}
      linkText="Sign up"
      linkHref="/signup"
      linkDescription="Don't have an account?"
    />
  );
};
