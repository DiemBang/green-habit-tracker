export interface IUserChallengeCompleted {
  _id: number;
  userID: number;
  challengeID: number;
  challengeName: string;
  dateCompleted: Date;
}
