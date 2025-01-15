import avatar from "../assets/rabbit.svg";

export const Profile = () => {
  return (
    <>
      <h2>Profile</h2>
      <section>
        <img
          src={avatar}
          alt="avatar profile"
          className="w-32 h-32 rounded-full"
        />
      </section>
      <section>
        <h3>Progress</h3>
      </section>
      <section>
        <h3>Badges</h3>
      </section>
    </>
  );
};
