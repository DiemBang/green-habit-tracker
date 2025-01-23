import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ProgressSummary = () => {
  const { streaks, habitSummary, co2Savings } = useLoaderData();
  const [period, setPeriod] = useState("month");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const summary = await fetchProgressSummary(userId, period);
  //         setData(summary);
  //       } catch (error) {
  //         console.error("Error fetching progress summary:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, [period]);

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
        <p>Longest Streak: {streaks.longestStreak} days</p>
        <p>Current Streak: {streaks.currentStreak} days</p>
      </section>

      <section>
        <h2>Habit Summary</h2>
        <p>Total Completed: {habitSummary.totalCompleted}</p>
        <ul>
          {habitSummary.topHabits.map(([habitId, count]: [string, number]) => (
            <li key={habitId}>
              {habitId}: {count} completions
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>CO₂ Savings</h2>
        <p>Total CO₂ Saved: {co2Savings.totalCO2} kg</p>
      </section>
    </div>
  );
};

export default ProgressSummary;
