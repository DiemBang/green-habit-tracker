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
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userChallenges/add`,
        userChallenge
      );
      console.log("Joining challenge:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      {/* Challenge Title */}
      <h3>{challenge.name}</h3>

      {/* Challenge Details */}
      <CardSection>
        <ul>
          <li key={challenge._id} className="mb-6">
            {/* Challenge Description */}
            <p className="leading-relaxed mb-4">{challenge.description}</p>

            {/* Points Badge */}
            <PointsBadge>{challenge.points} Points</PointsBadge>
          </li>
        </ul>
        {/* Join Button */}
        <ButtonWithIcon text="Join Challenge" onClick={handleJoin} />
      </CardSection>
    </>
  );
};
