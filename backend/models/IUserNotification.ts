export interface IUserNotification {
  _id: number;
  userID: number;
  category: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
