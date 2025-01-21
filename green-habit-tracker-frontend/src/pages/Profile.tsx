import { useLoaderData } from "react-router-dom";
import avatar from "../assets/rabbit.svg";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import utensilHeroBadge from "../assets/badges/utensil-hero.svg";
import noMorePlasticBagsBadge from "../assets/badges/no-more-plastic-bags.svg";
import paperSaverBadge from "../assets/badges/paper-saver.svg";
import clothChampionBadge from "../assets/badges/cloth-champion.svg";
import eWasteHeroBadge from "../assets/badges/ewaste-hero.png";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted";

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
        <h3>Rewards</h3>
        <div className="flex flex-wrap gap-6 justify-start">
          <CardSection className="grid grid-cols-2 gap-6">
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
