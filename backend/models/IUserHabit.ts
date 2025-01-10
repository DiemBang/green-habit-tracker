export interface IUserHabit {
  _id: number;
  userID: number;
  habitIdentifier: string;
  status: string;
  dateStarted: Date;
}
