import { createContext, useContext, useState, ReactNode } from "react";

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  toggleCalendar: () => void;
  showCalendar: boolean;
  setShowCalendar: (value: boolean) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        toggleCalendar,
        showCalendar,
        setShowCalendar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
