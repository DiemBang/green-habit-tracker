import { useLoaderData } from "react-router-dom";
import utensilHero from "../assets/challenge-icons/utensil-hero.png";
import noMorePlasticBagsIcon from "../assets/challenge-icons/no-plasticbags.png";
import paperSaverIcon from "../assets/challenge-icons/paper-saver.png";
import clothChampionIcon from "../assets/challenge-icons/cloth-champion.png";
import { IChallenge } from "../models/IChallenge";

export const Explore = () => {
  // TODO:
  // 1. Add endpoint to get this months challenges
  // 2. Import the icons to this Explore file
  //     import utensilHeroIcon from "../assets/challenge-icons/utensilHeroIcon.png";
  // 3. Make an object/dictionary of the icons for each challenge

  // challengeIcons = {
  //   "Utensil Hero": utensilHeroIcon,
  //   ...
  // }

  // 4. Use the icons in the challenges section below
  // <img src={challengeIcons[challenges[0].name]} alt={challenges[0].name} />

  type StringDictionary = { [key: string]: string };

  const challengeIcons: StringDictionary = {
    "Utensil Hero": utensilHero,
    "No More Plastic Bags": noMorePlasticBagsIcon,
    "Paper Saver": paperSaverIcon,
    "Cloth Champion": clothChampionIcon,
  };

  const { challenges } = useLoaderData();

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
        <p></p>
      </section>
    </>
  );
};
