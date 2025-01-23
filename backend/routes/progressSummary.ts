import { Router, Request, Response } from "express";
import express from "express";
import {
  calculateStreaks,
  summarizeHabits,
  calculateCO2Savings,
} from "../services/summaryService.js";
import { IHabit } from "../models/IHabit.js";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted.js";

const router = express.Router();

interface Co2Data {
  [name: string]: {
    co2Savings: number;
  };
}

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userID, period } = req.body as {
      userID: string;
      period: string;
    };

    // Fetch user habits from the database
    const completedHabits: IUserHabitCompleted[] = await req.app.locals.db
      .collection("UserHabitCompleted")
      .find({
        userID: userID,
        dateCompleted: { $gte: getStartDate(period), $lte: new Date() },
      })
      .toArray();

    const habitsData: IHabit[] = await req.app.locals.db
      .collection("Habit")
      .find()
      .toArray();

    // Process data
    const completedDates = completedHabits.map(
      (h: IUserHabitCompleted) => h.dateCompleted
    );
    const streaks = calculateStreaks(completedDates);

    const habitSummary = summarizeHabits(completedHabits);

    const co2Data: Co2Data = {};

    for (const habit of habitsData) {
      co2Data[habit.name] = {
        co2Savings: habit.co2EmissionKgPerAction,
      };
    }
    const co2Savings = calculateCO2Savings(completedHabits, co2Data);

    // Return combined data
    res.json({
      streaks,
      habitSummary,
      co2Savings,
    });
    return;
  } catch (error) {
    console.error("Error fetching progress summary:", error);
    res.status(500).json({ error: "Unable to fetch progress summary" });
  }
});

const getStartDate = (period: string) => {
  const now = new Date();
  if (period === "week") return new Date(now.setDate(now.getDate() - 7));
  if (period === "month") return new Date(now.setMonth(now.getMonth() - 1));
  if (period === "year")
    return new Date(now.setFullYear(now.getFullYear() - 1));
  return new Date(0); // Default: all time
};

export default router;
