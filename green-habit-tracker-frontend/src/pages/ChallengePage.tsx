import { useLoaderData } from "react-router-dom";
import { IChallenge } from "../models/IChallenge";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
export const ChallengePage = () => {
  const challenge = useLoaderData() as IChallenge;
  const handleJoin = () => {
    console.log("Joining challenge", challenge.name);
  };
  return (
    <>
      <h2>Challenge: {challenge.name}</h2>

      <h3>What heading works here?</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <ul>
          <li key={challenge._id}>
            <h4>{challenge.name}</h4>
            <p>{challenge.description}</p>
            <p>{challenge.points}</p>
          </li>
        </ul>
        <ButtonWithIcon text="Join" onClick={handleJoin} />
      </section>
    </>
  );
};
