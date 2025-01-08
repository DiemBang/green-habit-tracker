export interface IUserHabit {
  id: number;
  userId: number;
  habitTypeIdentifier: string;
  status: string;
  dateStarted: Date;
}
export interface IUser {
  _id: number;
  UserId: number;
  HabitTypeIdentifier: string;
  Status: string;
  DateStarted: Date;
}
