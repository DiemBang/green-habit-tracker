import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IProgressSummary } from "../models/IProgressSummary";
import { getProgressSummary } from "../services/ProgressSummaryService";
import { CardSection } from "../components/CardSection";

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
    <CardSection>
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        Progress Summary
      </h1>
      <div className="mb-8 flex">
        <label className="mr-4 text-lg font-medium text-gray-700">
          Period:
        </label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-300"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-emerald-600 mb-4">Streaks</h2>
        <div className="flex justify-between bg-emerald-50 p-4 rounded-lg shadow-sm">
          <div>
            <p className="text-lg font-medium">Longest Streak</p>
            <p className="text-2xl font-bold text-emerald-800">
              {progressSummary.streaks.longestStreak} days
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">Current Streak</p>
            <p className="text-2xl font-bold text-emerald-800">
              {progressSummary.streaks.currentStreak} days
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-emerald-600 mb-4">
          Habit Summary
        </h2>
        <p className="text-lg font-medium mb-4">
          Total Completed:{" "}
          <span className="text-emerald-800 font-bold">
            {progressSummary.habitSummary.totalCompleted}
          </span>
        </p>
        <ul className="list-none space-y-4">
          {progressSummary.habitSummary.topHabits.map(
            ([habitName, count]: [string, number]) => (
              <li
                key={habitName}
                className="flex items-center bg-emerald-50 p-4 rounded-lg shadow-sm"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full mr-4">
                  🌿
                </span>
                <div>
                  <p className="font-medium">{habitName}</p>
                  <p className="text-sm text-gray-600">{count} completions</p>
                </div>
              </li>
            )
          )}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-emerald-600 mb-4">
          CO₂ Savings
        </h2>
        <p className="text-lg font-medium">
          Total CO₂ Saved:{" "}
          <span className="text-emerald-800 font-bold">
            {progressSummary.co2Savings.totalCO2} kg
          </span>
        </p>
      </section>
    </CardSection>
  );
};

export default ProgressSummary;
