import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import utensilHero from "../assets/challenge-icons/utensil-hero.png";
import noMorePlasticBagsIcon from "../assets/challenge-icons/no-plasticbags.png";
import paperSaverIcon from "../assets/challenge-icons/paper-saver.png";
import clothChampionIcon from "../assets/challenge-icons/cloth-champion.png";
import { IChallenge } from "../models/IChallenge";
import { CardSection } from "../components/CardSection";
import ecoIcon from "/src/assets/ecotip-icon.svg";

export const Explore = () => {
  type StringDictionary = { [key: string]: string };

  const challengeIcons: StringDictionary = {
    "Utensil Hero": utensilHero,
    "No More Plastic Bags": noMorePlasticBagsIcon,
    "Paper Saver": paperSaverIcon,
    "Cloth Champion": clothChampionIcon,
  };

  const { challenges, ecotip } = useLoaderData();

  return (
    <>
      <h2>What's on?</h2>
      <h3>Challenges</h3>
      <CardSection>
        <div className="flex flex-wrap gap-6 justify-start">
          {challenges.map((challenge: IChallenge, index: number) => (
            <div key={index} className="flex items-center justify-center">
              <Link to={`/challenge/${challenge.habitIdentifier}`}>
                <img
                  src={challengeIcons[challenge.name]}
                  alt={challenge.description}
                  className="w-32 h-32 object-contain rounded-md"
                />
              </Link>
            </div>
          ))}
        </div>
      </CardSection>
      <h3 className="flex items-center">
        <img
          src={ecoIcon}
          alt="Eco Icon"
          className="w-5 h-5 mr-2 inline-block"
        />
        Eco-tip of the day
      </h3>

      <CardSection>
        <h4>{ecotip.name}</h4>
        <p>{ecotip.description}</p>
      </CardSection>
    </>
  );
};
