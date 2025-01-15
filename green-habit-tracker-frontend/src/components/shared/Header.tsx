import { useLocation } from "react-router-dom";
import logotype from "../../assets/category-icons/all-category.png";
import notificationIcon from "/src/assets/header-footer-icons/notification.svg";
import calendarIcon from "/src/assets/header-footer-icons/calendar-silhouette.svg";
import { useState } from "react";
import Calendar from "react-calendar";

export const Header = () => {
  const location = useLocation();

  // Check if the current path is '/home'
  const isHomePage = location.pathname === "/home";
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
    <>
      <header className="w-screen h-16 fixed top-0 rounded-b-lg flex items-center justify-center">
        <span>
          <img
            src={logotype}
            alt="logotype of the app"
            className="h-12 w-auto"
          />
        </span>
        {/* Conditionally Render Icons */}
        {isHomePage && (
          <div className="absolute right-4 flex items-center space-x-2">
            <img
              src={notificationIcon}
              alt="notifications icon"
              className="w-6 h-6 svg"
              aria-hidden="true"
            />
            <button
              onClick={toggleCalendar}
              aria-label="Toggle Calendar"
              className="p-1 rounded bg-calmBlue"
            >
              <img
                src={calendarIcon}
                alt="calendar icon"
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
        {/* Calendar Pop-up */}
        {showCalendar && (
          <div className="absolute top-16 right-4 bg-cloudWhite p-4 shadow-lg rounded-lg z-50">
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              className="react-calendar"
            />
          </div>
        )}
      </header>
    </>
  );
};
