export interface IUserNotification {
  _id: string;
  userID: string;
  category: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
