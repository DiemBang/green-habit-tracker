import { useLoaderData } from "react-router-dom";

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

  const { challenges } = useLoaderData();
  return (
    <>
      <h2>This is Explore</h2>
      <h3>Challenges</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <p>{challenges[0].description}</p>
      </section>
      <h3>Eco-tip of the day</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <p></p>
      </section>
    </>
  );
};
