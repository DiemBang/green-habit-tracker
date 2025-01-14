export interface IChallenge {
  _id: string;
  description: string;
  name: string;
  habitIdentifier: string;
  monthAvailableToJoin: number;
  noOfActionsCompletedNeeded: number;
  points: number;
  lengthOfChallengeInDays: number;
}
