import { Link, useLoaderData } from "react-router-dom";
import avatar from "../assets/rabbit.svg";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import utensilHeroBadge from "../assets/badges/utensil-hero.svg";
import noMorePlasticBagsBadge from "../assets/badges/no-more-plastic-bags.svg";
import paperSaverBadge from "../assets/badges/paper-saver.svg";
import clothChampionBadge from "../assets/badges/cloth-champion.svg";
import eWasteHeroBadge from "../assets/badges/ewaste-hero.png";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted";
import progressIcon from "../assets/progress-icon.svg";

export const Profile = () => {
  const { userChallenges, user } = useLoaderData();

  type StringDictionary = { [key: string]: string };

  const rewardBadges: StringDictionary = {
    "Utensil Hero": utensilHeroBadge,
    "No More Plastic Bags": noMorePlasticBagsBadge,
    "Paper Saver": paperSaverBadge,
    "Cloth Champion": clothChampionBadge,
    "E-Waste Hero": eWasteHeroBadge,
  };

  return (
    <>
      <h3>Profile</h3>
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
        <Link to={"/progress-summary"}>
          <CardSection>
            <div className="flex items-center space-x-4">
              <img
                src={progressIcon}
                alt="Icon for progress and stats"
                className="w-8 h-8"
              />
              <p className="text-lg">Your Eco Progress at a Glance</p>
              <span className="material-symbols-outlined text-2xl">
                chevron_right
              </span>
            </div>
          </CardSection>
        </Link>
      </section>
      <section>
        <h3>Achievements</h3>
        <div className="flex flex-wrap gap-6 justify-start">
          <CardSection className="grid grid-cols-2 gap-6 mb-20">
            {userChallenges.map((userChallenge: IUserChallengeCompleted) => (
              <img
                src={rewardBadges[userChallenge.challengeName]}
                alt={
                  "badge completed for challenge: " +
                  userChallenge.challengeName
                }
                key={userChallenge.challengeID}
                className="w-32 h-32 object-contain rounded-full"
              />
            ))}
          </CardSection>
        </div>
      </section>
    </>
  );
};
