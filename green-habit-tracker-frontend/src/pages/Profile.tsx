import avatar from "../assets/rabbit.svg";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";

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
        <PointsBadge>1000</PointsBadge>
      </section>
      <section>
        <h3>Progress</h3>
        <CardSection>Check your progress and stats</CardSection>
      </section>
      <section>
        <h3>Badges</h3>
        <CardSection>List collected badges</CardSection>
      </section>
    </>
  );
};
