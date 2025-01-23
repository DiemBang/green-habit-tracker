import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IProgressSummary } from "../models/IProgressSummary";
import { getProgressSummary } from "../services/ProgressSummaryService";

const ProgressSummary = () => {
  const progressSummaryFromLoader = useLoaderData();
  const [period, setPeriod] = useState("month");
  const [progressSummary, setProgressSummary] = useState<IProgressSummary>(
    progressSummaryFromLoader
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem("userID") || "";
        const summary = await getProgressSummary(userID, period);
        setProgressSummary(summary);
      } catch (error) {
        console.error("Error fetching progress summary:", error);
      }
    };
    fetchData();
  }, [period]);

  return (
    <div className="progress-summary">
      <h1>Progress Summary</h1>
      <div>
        <label>
          Period:
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </label>
      </div>

      <section>
        <h2>Streaks</h2>
        <p>Longest Streak: {progressSummary.streaks.longestStreak} days</p>
        <p>Current Streak: {progressSummary.streaks.currentStreak} days</p>
      </section>

      <section>
        <h2>Habit Summary</h2>
        <p>Total Completed: {progressSummary.habitSummary.totalCompleted}</p>
        <ul>
          {progressSummary.habitSummary.topHabits.map(
            ([habitName, count]: [string, number]) => (
              <li key={habitName}>
                {habitName}: {count} completions
              </li>
            )
          )}
        </ul>
      </section>

      <section>
        <h2>CO₂ Savings</h2>
        <p>Total CO₂ Saved: {progressSummary.co2Savings.totalCO2} kg</p>
      </section>
    </div>
  );
};

export default ProgressSummary;
