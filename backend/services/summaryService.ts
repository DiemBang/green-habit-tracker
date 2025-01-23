import { differenceInCalendarDays } from "date-fns";

export const calculateStreaks = (completedDates: Date[]) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;

  completedDates.forEach((currentDate) => {
    if (lastDate && differenceInCalendarDays(currentDate, lastDate) === 1) {
      currentStreak++;
    } else {
      currentStreak = 1; // Reset if not consecutive
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    lastDate = currentDate;
  });

  return { longestStreak, currentStreak };
};

export const summarizeHabits = (
  completedHabits: { habitIdentifier: string }[]
) => {
  const habitCounts: Record<string, number> = {};

  for (const { habitIdentifier } of completedHabits) {
    if (habitCounts[habitIdentifier]) {
      habitCounts[habitIdentifier]++;
    } else {
      habitCounts[habitIdentifier] = 1;
    }
  }

  const sortedHabits = Object.entries(habitCounts).sort((a, b) => b[1] - a[1]);
  return {
    totalCompleted: completedHabits.length,
    topHabits: sortedHabits.slice(0, 3), // Top 3 habits
  };
};

export const calculateCO2Savings = (
  completedHabits: { habitIdentifier: string }[],
  habitsData: { [identifier: string]: { co2Savings: number } }
) => {
  let totalCO2 = 0;

  completedHabits.forEach(({ habitIdentifier }) => {
    const habit = habitsData[habitIdentifier];
    if (habit && typeof habit.co2Savings === "number") {
      totalCO2 += habit.co2Savings;
    }
  });

  return { totalCO2 };
};
