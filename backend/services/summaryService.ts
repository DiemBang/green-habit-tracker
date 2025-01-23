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

export const summarizeHabits = (completedHabits: { name: string }[]) => {
  const habitCounts: Record<string, number> = {};

  for (const { name: name } of completedHabits) {
    if (habitCounts[name]) {
      habitCounts[name]++;
    } else {
      habitCounts[name] = 1;
    }
  }

  const sortedHabits = Object.entries(habitCounts).sort((a, b) => b[1] - a[1]);
  return {
    totalCompleted: completedHabits.length,
    topHabits: sortedHabits.slice(0, 3), // Top 3 habits
  };
};

export const calculateCO2Savings = (
  completedHabits: { name: string }[],
  habitsData: { [name: string]: { co2Savings: number } }
) => {
  let totalCO2 = 0;

  completedHabits.forEach(({ name }) => {
    const habit = habitsData[name];
    if (habit && typeof habit.co2Savings === "number") {
      totalCO2 += habit.co2Savings;
    }
  });

  return { totalCO2 };
};
