import { Link, useLocation } from "react-router-dom";
import logotype from "/src/assets/greenhabit-logo.svg";
import notificationIcon from "/src/assets/header-footer-icons/notification.svg";
import calendarIcon from "/src/assets/header-footer-icons/calendar-silhouette.svg";
import settingsIcon from "/src/assets/header-footer-icons/gear.svg";
import { useEffect, useRef, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { useCalendar } from "../../contexts/CalendarContext";
import { NotificationPopup } from "../NotificationPopup";
import { IUserNotification } from "../../models/IUserNotification";

export const Header = ({
  notifications,
}: {
  notifications: IUserNotification[];
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const isProfilePage = location.pathname === "/profile";
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     message:
  //       "Hey, eco-warrior! 🌍 Don't forget to complete your [habit name] today. You're making a difference!",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     message: "New challenge: Plastic-Free Month is available!",
  //     read: true,
  //   },
  //   {
  //     id: 3,
  //     message: "You've earned 50 points for completing a challenge.",
  //     read: false,
  //   },
  // ]);
  const togglePopup = () => setIsPopupVisible((prev) => !prev);

  const popupRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopupVisible]);

  const {
    toggleCalendar,
    showCalendar,
    selectedDate,
    setSelectedDate,
    setShowCalendar,
  } = useCalendar();

  // Type-safe onChange handler
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value); // Update state if the value is a single Date
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false); // Close the calendar
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, setShowCalendar]);

  const handleCalendarIconClick = () => {
    toggleCalendar();
  };

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
            <button
              onClick={togglePopup}
              aria-label="Toggle Notifications"
              className="notification-icon p-1 rounded bg-calmBlue"
            >
              <img
                src={notificationIcon}
                alt="notifications icon"
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
            </button>
            <button
              ref={iconRef}
              onClick={handleCalendarIconClick}
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
        {isProfilePage && (
          <div className="absolute right-4 flex items-center space-x-2">
            <Link to="/settings">
              <img
                src={settingsIcon}
                alt="settings icon"
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
        {/* Calendar Pop-up */}
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute top-16 right-4 bg-cloudWhite p-4 shadow-lg rounded-lg z-50"
          >
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              className="react-calendar"
            />
          </div>
        )}
        {/* Notification Pop-up */}
        {isPopupVisible && (
          <div ref={popupRef}>
            <NotificationPopup
              notifications={notifications}
              onClose={() => setIsPopupVisible(false)}
            />
          </div>
        )}
      </header>
    </>
  );
};
