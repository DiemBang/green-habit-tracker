export interface IChallenge {
  _id: number;
  description: string;
  name: string;
  habitIdentifier: string;
  monthAvailableToJoin: number;
  noOfActionsCompletedNeeded: number;
  points: number;
  lengthOfChallengeInDays: number;
}
