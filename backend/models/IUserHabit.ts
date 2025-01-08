export interface IUserHabit {
  id: number;
  userId: number;
  habitTypeIdentifier: string;
  status: string;
  dateStarted: Date;
}
