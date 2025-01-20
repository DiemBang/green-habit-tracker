export interface IUserChallengeCompleted {
  _id: string;
  userID: string;
  challengeID: string;
  challengeName: string;
  dateCompleted: Date;
}
