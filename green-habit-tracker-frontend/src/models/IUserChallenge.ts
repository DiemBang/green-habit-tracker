export interface IUserChallenge {
  _id: number;
  challengeID: string;
  challengeName: string;
  dateEnded: Date;
  dateJoined: Date;
  userID: string;
  lengthOfChallengeInDays: number;
}
