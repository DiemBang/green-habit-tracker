export interface IUserHabitCompleted {
  _id: number;
  userHabitID: number;
  dateCompleted: Date;
  habitIdentifier: string;
  userId: number;
  name: string;
}
