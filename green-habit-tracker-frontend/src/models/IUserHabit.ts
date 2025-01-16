export interface IUserHabit {
  _id: string;
  dateStarted: string;
  frequency: string;
  habitIdentifier: string;
  reminderTime: string;
  userID: string;
  name: string;
  completedToday: boolean;
  lastCompletedDate: string;
}
