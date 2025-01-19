import { useLoaderData } from "react-router-dom";
import avatar from "../assets/rabbit.svg";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import { IUser } from "../models/IUser";

export const Profile = () => {
  const user = useLoaderData() as IUser;
  return (
    <>
      <h2>Profile</h2>
      <section className="flex items-center gap-6">
        <img
          src={avatar}
          alt="avatar profile"
          className="w-32 h-32 rounded-full shadow-md"
        />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <PointsBadge>
            <span className="text-xl font-bold text-green-600">1000</span>
          </PointsBadge>
        </div>
      </section>
      <section>
        <h3>Progress</h3>
        <CardSection>
          <p>Check your progress and stats</p>
        </CardSection>
      </section>
      <section>
        <h3>Badges</h3>
        <CardSection>
          <p>List collected badges</p>
        </CardSection>
      </section>
    </>
  );
};
