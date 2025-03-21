import { useLoaderData } from "react-router-dom";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import axios from "axios";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";
import { useState } from "react";
import { IChallenge } from "../models/IChallenge";
import { IHabit } from "../models/IHabit";

export const ChallengePage = () => {
  const {
    challenge,
    isAlreadyJoined,
    habit,
  }: { challenge: IChallenge; isAlreadyJoined: boolean; habit: IHabit } =
    useLoaderData();
  const [isJoined, setIsJoined] = useState<boolean>(isAlreadyJoined);

  const handleJoin = async () => {
    const userChallenge = {
      challengeID: challenge._id,
      challengeName: challenge.name,
      userID: localStorage.getItem("userID"),
      noOfActionsCompletedNeeded: challenge.noOfActionsCompletedNeeded,
      lengthOfChallengeInDays: challenge.lengthOfChallengeInDays,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userChallenges/add`,
        userChallenge
      );

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

      setIsJoined(false);
    } catch (error) {
      console.error("Error leaving challenge:", error);
    }
  };

  return (
    <>
      {/* Challenge Title */}
      <h2>{challenge.name}</h2>
      <p>Take on this challenge to make a difference!</p>

      {/* Challenge Details */}
      <CardSection>
        <ul>
          <li key={challenge._id} className="mb-6">
            {/* Challenge Description */}
            <p className="leading-relaxed mb-4">{challenge.description}</p>

            {/* Challenge Metrics */}
            <p>
              <span className="font-medium">Number of actions needed:</span>{" "}
              {challenge.noOfActionsCompletedNeeded}
            </p>
            <p>
              <span className="font-medium">Challenge length:</span>{" "}
              {challenge.lengthOfChallengeInDays} days
            </p>
            <p>
              <span className="font-medium">
                Estimated CO₂ saved per action:
              </span>{" "}
              {habit.co2EmissionKgPerAction} kg
            </p>

            {/* Points Badge */}
            <div className="mt-4">
              <PointsBadge>{challenge.points}</PointsBadge>
            </div>
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
