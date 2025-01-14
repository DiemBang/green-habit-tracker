import { useLoaderData } from "react-router-dom";
import { IChallenge } from "../models/IChallenge";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import axios from "axios";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";

export const ChallengePage = () => {
  const challenge = useLoaderData() as IChallenge;
  const handleJoin = async () => {
    const userChallenge = {
      challengeID: challenge._id,
      challengeName: challenge.name,
      userID: localStorage.getItem("userID"),
      lengthOfChallengeInDays: challenge.lengthOfChallengeInDays,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/userChallenges/add",
        userChallenge
      );
      console.log("Joining challenge:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <>
      <h2>Challenge: {challenge.name}</h2>

      <h3>What heading works here?</h3>
      <CardSection>
        <ul>
          <li key={challenge._id}>
            <h4>{challenge.name}</h4>
            <p>{challenge.description}</p>
            <PointsBadge>
              <p>{challenge.points}</p>
            </PointsBadge>
          </li>
        </ul>
        <ButtonWithIcon text="Join" onClick={handleJoin} />
      </CardSection>
    </>
  );
};
