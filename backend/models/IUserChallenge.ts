export interface IUserChallenge {
  _id: number;
  userID: number;
  challengeID: number;
  challengeName: string;
  dateJoined: Date;
  dateEnded: Date;
  habitIdentifier: string;
}
