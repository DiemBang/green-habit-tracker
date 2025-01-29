import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import avatar from "../assets/rabbit.svg";
import { IUser } from "../models/IUser";
import { SettingButton } from "../components/SettingButton";
import { ProfilePhotoUpload } from "../components/ProfilePhoto";

export const Settings = () => {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();

  // Sign Out Function
  const handleSignOut = () => {
    // Clear user session (e.g., token from localStorage)
    localStorage.removeItem("userID");
    localStorage.removeItem("userToken");

    // Redirect to login or landing page
    navigate("/login");
  };

  return (
    <>
      <h2>Settings</h2>
      <section className="flex flex-wrap items-center gap-6 mb-4">
        <ProfilePhotoUpload></ProfilePhotoUpload>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </section>
      <Link to={"/notifications-settings"}>
        <SettingButton>
          <h3 className="text-sm mt-2 mb-2">Notifications</h3>
        </SettingButton>
      </Link>
      <Link to={"/about"} className="lg:hidden">
        <SettingButton>
          <h3 className="text-sm mt-2 mb-2">About Green Habits</h3>
        </SettingButton>
      </Link>
      <Link to={"/tutorial"} className="lg:hidden">
        <SettingButton>
          <h3 className="text-sm mt-2 mb-2">Tutorial</h3>
        </SettingButton>
      </Link>
      <SettingButton
        icon="logout"
        className="lg:hidden"
        onClick={handleSignOut}
      >
        <h3 className="text-sm mt-2 mb-2">Sign out</h3>
      </SettingButton>
      <SettingButton icon="delete_forever" variant="danger">
        <h3 className="text-sm mt-2 mb-2 text-white">Delete account</h3>
      </SettingButton>
    </>
  );
};
