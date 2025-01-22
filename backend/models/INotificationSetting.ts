interface ISetting {
  dailyHabit: boolean;
  reward: boolean;
  challenge: boolean;
  streak: boolean;
}

export interface INotificationSetting {
  _id: string;
  userID: string;
  settings: ISetting;
}
