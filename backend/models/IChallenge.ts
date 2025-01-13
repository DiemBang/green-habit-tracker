export interface IChallenge {
  _id: number;
  name: string;
  description: string;
  habitIdentifier: string;
  monthAvailableToJoin: number;
  noOfActionsCompletedNeeded: number;
  points: number;
  lengthOfChallengeInDays: number;
}
