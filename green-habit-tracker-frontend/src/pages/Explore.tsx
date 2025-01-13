import { useLoaderData } from "react-router-dom";
import utensilHero from "../assets/challenge-icons/utensil-hero.png";
import noMorePlasticBagsIcon from "../assets/challenge-icons/no-plasticbags.png";
import paperSaverIcon from "../assets/challenge-icons/paper-saver.png";
import clothChampionIcon from "../assets/challenge-icons/cloth-champion.png";
import { IChallenge } from "../models/IChallenge";

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
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <div className="flex flex-wrap gap-6 justify-start">
          {challenges.map((challenge: IChallenge, index: number) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={challengeIcons[challenge.name]}
                alt={challenge.description}
                className="w-32 h-32 object-contain rounded-md"
              />
            </div>
          ))}
        </div>
      </section>
      <h3>Eco-tip of the day</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <h4>{ecotip.name}</h4>
        <p>{ecotip.description}</p>
      </section>
    </>
  );
};
