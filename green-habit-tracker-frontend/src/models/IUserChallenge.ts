export interface IUserChallenge {
  _id: string;
  challengeID: string;
  challengeName: string;
  dateEnded: Date;
  dateJoined: Date;
  userID: string;
  lengthOfChallengeInDays: number;
}
