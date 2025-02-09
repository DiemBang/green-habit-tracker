import { Link, useLoaderData } from "react-router-dom";
import avatar from "../assets/rabbit.svg";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import utensilHeroBadge from "../assets/badges/utensil-hero.png";
import noMorePlasticBagsBadge from "../assets/badges/no-more-plasticbags.png";
import paperSaverBadge from "../assets/badges/paper-saver.png";
import clothChampionBadge from "../assets/badges/cloth-champion.png";
import eWasteHeroBadge from "../assets/badges/ewaste-hero.png";
import plantSipperBadge from "../assets/badges/plant-sipper.png";
import compostStarterBadge from "../assets/badges/compost-starter.png";
import showerSaverBadge from "../assets/badges/shower-saver.png";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted";
import progressIcon from "../assets/progress-icon.svg";
import { useState, useEffect } from "react";

export const Profile = () => {
  const { userChallenges, user } = useLoaderData();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the stored image when the component loads
    const storedImage = localStorage.getItem("profilePic");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  type StringDictionary = { [key: string]: string };

  const rewardBadges: StringDictionary = {
    "Utensil Hero": utensilHeroBadge,
    "No More Plastic Bags": noMorePlasticBagsBadge,
    "Paper Saver": paperSaverBadge,
    "Cloth Champion": clothChampionBadge,
    "E-Waste Hero": eWasteHeroBadge,
    "Plant Sipper": plantSipperBadge,
    "Compost Starter": compostStarterBadge,
    "Shower Saver": showerSaverBadge,
  };

  return (
    <>
      <h2>Profile</h2>
      <section className="flex items-center gap-6">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />
        ) : (
          <img
            src={avatar}
            alt="avatar profile"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />
        )}
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <PointsBadge>
            <span className="text-xl font-bold text-green-600">
              {user.points || 0}
            </span>
          </PointsBadge>
        </div>
      </section>
      <section className="lg:hidden">
        <h3>Your eco progress at a glance</h3>
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
        <h3>Achievements</h3>
        <p>
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
              key={"BadgeImg" + userChallenge.challengeID}
              className="w-32 h-32 object-contain rounded-full"
            />
          ))}
        </CardSection>
      </section>
    </>
  );
};
