export interface IChallenge {
  _id: number;
  name: string;
  description: string;
  HabitIdentifier: string;
  MonthAvailableToJoin: number;
  NoOfActionsCompletedNeeded: number;
  Points: number;
  LengthOfChallengeInDays: number;
}
