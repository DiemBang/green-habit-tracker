import { useLoaderData } from "react-router-dom";
import avatar from "../assets/rabbit.svg";
import { IUser } from "../models/IUser";
import { SettingButton } from "../components/SettingButton";

export const Settings = () => {
  const user = useLoaderData() as IUser;
  return (
    <>
      <h2>Settings</h2>
      <section className="flex items-center gap-6 mb-4">
        <img
          src={avatar}
          alt="avatar profile"
          className="w-32 h-32 rounded-full shadow-md"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <span className="material-symbols-outlined text-2xl">
            chevron_right
          </span>
        </div>
      </section>
      <SettingButton>
        <h4 className="text-sm mt-2 mb-2">Notifcations</h4>
      </SettingButton>
      <SettingButton>
        <h4 className="text-sm mt-2 mb-2">About Green Habits</h4>
      </SettingButton>
      <SettingButton>
        <h4 className="text-sm mt-2 mb-2">Tutorial</h4>
      </SettingButton>
      <SettingButton showIcon={false}>
        <h4 className="text-sm mt-2 mb-2">Sign out</h4>
      </SettingButton>
      <SettingButton showIcon={false} variant="danger">
        <h4 className="text-sm mt-2 mb-2 text-white">Delete account</h4>
      </SettingButton>
    </>
  );
};
