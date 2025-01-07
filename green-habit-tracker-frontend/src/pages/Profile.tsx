import avatar from "../assets/avatar.svg";

export const Profile = () => {
  return (
    <>
      <p>This is Profile</p>
      <section>
        <img
          src={avatar}
          alt="avatar profile"
          className="w-32 h-32 rounded-full border-4 border-green-500"
        />
      </section>
    </>
  );
};
