import { format, differenceInDays, isSameDay } from "date-fns";
import { IUserHabit } from "../models/IUserHabit";
import { useCalendar } from "../contexts/CalendarContext";

interface HabitTodoProps {
  habit: IUserHabit;
  toggleCompletion: (id: string) => void;
}

export const HabitTodo: React.FC<HabitTodoProps> = ({
  habit,
  toggleCompletion,
}) => {
  const { selectedDate } = useCalendar();

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

  const isPastOrFutureDate = () => {
    const today = new Date();
    return differenceInDays(new Date(selectedDate), today) !== 0;
  };

  const isLastCompletedDayToday = (
    lastCompletedDate: string | null
  ): boolean => {
    if (!lastCompletedDate) return false;

    const lastCompleted = new Date(lastCompletedDate);
    const today = new Date();

    return isSameDay(lastCompleted, today);
  };

  const isInactive = (): boolean => {
    // Radio button should always be inactive for days other than today
    if (isPastOrFutureDate()) return true;

    // If lastCompletedDate is today then radio button should NOT be inactive
    if (isLastCompletedDayToday(habit.lastCompletedDate)) return false;

    // Daily buttons should always be active (for today)
    if (habit.frequency === "daily") return false;

    // Weekly buttons should be inactive if the lastCompletedDate is
    // in the previous 7 days from the selectedDate
    if (habit.frequency === "weekly") {
      return (
        habit.lastCompletedDate !== null &&
        differenceInDays(
          new Date(selectedDate),
          new Date(habit.lastCompletedDate)
        ) <= 7
      );
    }

    // Monthly buttons should be inactive if the lastCompletedDate is
    // in the previous 30 days from the selectedDate
    if (habit.frequency === "monthly") {
      return (
        habit.lastCompletedDate !== null &&
        differenceInDays(
          new Date(selectedDate),
          new Date(habit.lastCompletedDate)
        ) <= 30
      );
    }
    return true;
  };

  // Function that decide when radio button is checked.
  const shouldShowCheckmark = (): boolean => {
    // If habit has not been completed before selectedDate then
    // checkmark should NOT be shown
    if (!habit.lastCompletedDate) return false;

    const lastCompleted = new Date(habit.lastCompletedDate);
    const daysSinceLastCompletion = differenceInDays(
      new Date(selectedDate),
      lastCompleted
    );
    // Show checkmark if a daily habit is completed on selected date in calendar
    if (habit.frequency === "daily") {
      return isSameDay(lastCompleted, new Date(selectedDate));
    }
    // Show checkmark if a weekly habit has been completed within 7 days
    if (habit.frequency === "weekly") {
      if (daysSinceLastCompletion < 7 && daysSinceLastCompletion >= 0) {
        return true;
      } else {
        return false;
      }
    }
    // Show checkmark if a monthly habit has been completed within 30 days
    if (habit.frequency === "monthly") {
      return daysSinceLastCompletion <= 30 && daysSinceLastCompletion >= 0;
    }

    return false;
  };

  // Determine if the lastCompletedDate should be displayed
  const shouldShowLastCompletedDate = (): boolean => {
    if (habit.frequency === "daily") return false; // Never show for daily habits
    return shouldShowCheckmark(); // Only show for weekly/monthly habits if the checkmark is shown
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
        {/* Show the last completed date only when applicable */}
        {formattedDate && shouldShowLastCompletedDate() && (
          <span className="text-xs whitespace-nowrap">
            Last Completed {formattedDate}
          </span>
        )}
      </div>

      {/* Completion Icon */}
      <div className="flex items-center gap-2 text-right">
        <span
          onClick={() => !isInactive() && toggleCompletion(habit._id)}
          className={`material-symbols-outlined ${
            isInactive()
              ? "text-gray-400 cursor-not-allowed"
              : shouldShowCheckmark()
              ? "text-green-500 cursor-pointer"
              : "text-charcoalGray cursor-pointer"
          } text-2xl flex-shrink-0`}
          title={
            isInactive()
              ? "Cannot toggle on this date"
              : shouldShowCheckmark()
              ? "Mark as incomplete"
              : "Mark as complete"
          }
        >
          {shouldShowCheckmark() ? "check_circle" : "radio_button_unchecked"}
        </span>
      </div>
    </li>
  );
};
