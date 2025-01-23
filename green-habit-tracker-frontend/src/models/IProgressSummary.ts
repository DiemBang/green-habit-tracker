export interface IProgressSummary {
  streaks: {
    longestStreak: number;
    currentStreak: number;
  };
  habitSummary: {
    totalCompleted: number;
    topHabits: [string, number][];
  };
  co2Savings: {
    totalCO2: number;
  };
}
