import { format } from "date-fns";
import { IUserHabit } from "../models/IUserHabit";

interface HabitTodoProps {
  habit: IUserHabit;
  toggleCompletion: (id: string) => void;
}

export const HabitTodo: React.FC<HabitTodoProps> = ({
  habit,
  toggleCompletion,
}) => {
  // Determine the color based on frequency
  const getFrequencyColor = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case "daily":
        return "text-green-400"; // Daily = Green
      case "weekly":
        return "text-blue-400"; // Weekly = Blue
      case "monthly":
        return "text-orange-400"; // Monthly = Orange
      default:
        return "text-gray-400"; // Default = Gray
    }
  };

  const formatLastCompletedDate = (
    lastCompletedDate: string | null
  ): string => {
    if (!lastCompletedDate) {
      return ""; // Return an empty string if the date is null
    }

    const date = new Date(lastCompletedDate);

    return format(date, "d/M"); // Format day as "16" and month as "1"
  };

  const lastCompletedDate = habit.lastCompletedDate; // e.g., "2025-01-16T09:52:29.629Z" or null
  const formattedDate = formatLastCompletedDate(lastCompletedDate);

  return (
    <li
      key={habit._id}
      className="flex items-center justify-between gap-4 py-2 px-4 border-b border-gray-200"
    >
      {/* Habit Name and Frequency */}
      <div className="flex-grow">
        <p className="text-lg font-medium leading-tight break-words">
          {habit.name}
        </p>
        <p
          className={`${getFrequencyColor(habit.frequency)} text-sm uppercase`}
        >
          {habit.frequency}
        </p>
        {/* Only show the date for weekly or monthly habits */}
        {formattedDate &&
          (habit.frequency.toLowerCase() === "weekly" ||
            habit.frequency.toLowerCase() === "monthly") && (
            <span className="text-xs whitespace-nowrap">
              Last Completed {formattedDate}
            </span>
          )}
      </div>

      {/* Completion Icon and Date */}
      <div className="flex items-center gap-2 text-right">
        <span
          onClick={() => toggleCompletion(habit._id)}
          className={`material-symbols-outlined cursor-pointer text-2xl flex-shrink-0 ${
            habit.completedToday ? "text-green-500" : "text-charcoalGray"
          }`}
          title={
            habit.completedToday ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {habit.completedToday ? "check_circle" : "radio_button_unchecked"}
        </span>
      </div>
    </li>
  );
};
