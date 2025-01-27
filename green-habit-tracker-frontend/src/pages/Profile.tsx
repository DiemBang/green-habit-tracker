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
      <section className="flex items-center gap-6 mb-6">
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
        <Link to={"/progress-summary"}>
          <CardSection>
            <div className="flex items-center justify-between">
              {/* Icon on the left */}
              <img
                src={progressIcon}
                alt="Icon for progress and stats"
                className="w-8 h-8 flex-shrink-0"
              />

              {/* Text content in the middle */}
              <div className="flex-1 ml-4">
                <h4 className="text-lg font-bold text-emerald-700">
                  Your Eco Progress at a Glance
                </h4>
                <p>
                  Discover how your habits are making a difference! Track your
                  streaks, top habits, and CO₂ savings all in one place.
                </p>
              </div>

              {/* Arrow icon on the right */}
              <span className="material-symbols-outlined text-2xl">
                chevron_right
              </span>
            </div>
          </CardSection>
        </Link>
      </section>
      <section>
        <h3 className="text-lg font-bold text-emerald-700 mb-2">
          Achievements
        </h3>
        <p className="px-4 mb-4">
          Every badge tells a story of your dedication to living sustainably.
          From reducing waste to saving resources, these rewards celebrate the
          challenges you’ve completed and the positive impact you’ve made. Keep
          collecting to unlock your full eco potential!
        </p>

        <CardSection className="flex flex-row flex-wrap justify-start items-start gap-4 flex-none mb-20 px-4">
          {userChallenges.map((userChallenge: IUserChallengeCompleted) => (
            <img
              src={rewardBadges[userChallenge.challengeName]}
              alt={
                "badge completed for challenge: " + userChallenge.challengeName
              }
              key={userChallenge.challengeID}
              className="w-32 h-32 object-contain rounded-full"
            />
          ))}
        </CardSection>
      </section>
    </>
  );
};
