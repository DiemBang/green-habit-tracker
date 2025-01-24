import { useLoaderData } from "react-router-dom";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import axios from "axios";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import { useState } from "react";

export const ChallengePage = () => {
  const { challenge, isAlreadyJoined } = useLoaderData();
  const [isJoined, setIsJoined] = useState<boolean>(isAlreadyJoined);

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
      setIsJoined(true);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleLeave = async () => {
    try {
      const userID = localStorage.getItem("userID");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userChallenges/delete`,
        {
          data: {
            userID: userID,
            challengeID: challenge._id,
          },
        }
      );
      console.log("User left challenge.");
      setIsJoined(false);
    } catch (error) {
      console.error("Error leaving challenge:", error);
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
        {/* Join/Leave Button */}
        <ButtonWithIcon
          text={isJoined ? "Leave Challenge" : "Join Challenge"}
          onClick={isJoined ? handleLeave : handleJoin}
        />
      </CardSection>
    </>
  );
};
