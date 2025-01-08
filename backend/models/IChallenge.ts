export interface IChallenge {
  _id: number;
  Name: string;
  Description: string;
  HabitIdentifier: string;
  MonthAvailableToJoin: number;
  NoOfActionsCompletedNeeded: number;
  Points: number;
  LengthOfChallengeInDays: number;
}
