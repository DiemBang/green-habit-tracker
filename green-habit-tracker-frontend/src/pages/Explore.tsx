import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import utensilHero from "../assets/challenge-icons/utensil-hero.png";
import noMorePlasticBagsIcon from "../assets/challenge-icons/no-plasticbags.png";
import paperSaverIcon from "../assets/challenge-icons/paper-saver.png";
import clothChampionIcon from "../assets/challenge-icons/cloth-champion.png";
import eWasteHeroIcon from "../assets/challenge-icons/ewaste-hero.png";
import { IChallenge } from "../models/IChallenge";
import { CardSection } from "../components/CardSection";
import ecoIcon from "/src/assets/ecotip-icon.svg";
import challengeIcon from "/src/assets/planet.svg";

export const Explore = () => {
  type StringDictionary = { [key: string]: string };

  const challengeIcons: StringDictionary = {
    "Utensil Hero": utensilHero,
    "No More Plastic Bags": noMorePlasticBagsIcon,
    "Paper Saver": paperSaverIcon,
    "Cloth Champion": clothChampionIcon,
    "E-Waste Hero": eWasteHeroIcon,
  };

  const { challenges, ecotip } = useLoaderData();

  return (
    <>
      <h3 className="flex items-center">Explore what's on</h3>
      <h3>
        <img
          src={challengeIcon}
          alt="Challenge Icon"
          className="w-5 h-5 mr-2 inline-block"
        />
        Challenges
      </h3>
      <p className="px-4 mb-4">
        Take on a challenge this month! Complete more green habits, make a
        positive impact, and collect points along the way.
      </p>
      <CardSection className="flex flex-row flex-wrap justify-start items-start gap-4 flex-none px-4">
        {challenges.map((challenge: IChallenge) => (
          <Link
            to={`/challenge/${challenge.habitIdentifier}`}
            key={challenge._id}
            className="group flex flex-col items-center justify-center transition-transform duration-200 transform hover:scale-105"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full shadow-sm flex items-center justify-center border-2 border-white hover:border-emerald-500">
              <img
                src={challengeIcons[challenge.name]}
                alt={challenge.description}
                className="w-28 h-28 object-contain rounded-full"
              />
            </div>
          </Link>
        ))}
      </CardSection>
      <h3 className="flex items-center">
        <img
          src={ecoIcon}
          alt="Eco Icon"
          className="w-5 h-5 mr-2 inline-block"
        />
        Eco-tip of the day
      </h3>

      <CardSection className="mb-20">
        <div className="p-4">
          <h4>{ecotip.name}</h4>
          <p className="mt-2">{ecotip.description}</p>
        </div>
      </CardSection>
    </>
  );
};
