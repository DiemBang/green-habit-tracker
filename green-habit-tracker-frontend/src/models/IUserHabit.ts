export interface IUserHabit {
  _id: string;
  dateStarted: Date;
  frequency: string;
  habitIdentifier: string;
  reminderTime: string;
  userID: string;
  name: string;
  completedToday: boolean;
}
