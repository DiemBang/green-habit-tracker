export interface IUserChallengeCompleted {
  _id: number;
  UserID: number;
  ChallengeID: number;
  ChallengeName: string;
  DateCompleted: Date;
}
