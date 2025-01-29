import { Link, useLocation, useNavigate } from "react-router-dom";
import logotype from "/src/assets/greenhabit-logo.svg";
import notificationIcon from "/src/assets/header-footer-icons/notification.svg";
import calendarIcon from "/src/assets/header-footer-icons/calendar-silhouette.svg";
import settingsIcon from "/src/assets/header-footer-icons/gear.svg";
import { useEffect, useRef, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { useCalendar } from "../../contexts/CalendarContext";
import { NotificationPopup } from "../NotificationPopup";
import { IUserNotification } from "../../models/IUserNotification";
import { markNotificationsAsRead } from "../../services/userNotificationService";
import { getBackIconConfig } from "../../services/backIconConfig";

export const Header = ({
  notifications: initialNotifications,
}: {
  notifications: IUserNotification[];
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const isProfilePage = location.pathname === "/profile";

  const [notifications, setNotifications] = useState(initialNotifications);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { showBackIcon, backText } = getBackIconConfig(location.pathname);

  const handleBackClick = () => {
    navigate(-1);
  };

  const popupRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLButtonElement | null>(null);

  const {
    toggleCalendar,
    showCalendar,
    selectedDate,
    setSelectedDate,
    setShowCalendar,
  } = useCalendar();

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
    // Mark all as read when closing notifications
    // (i.e. isPopupVisible, because this is checked before
    //  the value is updated for next render)
    if (isPopupVisible) {
      markNotificationsAsRead();
      markAllAsRead();
    }
  };

  const markAllAsRead = () => {
    // TODO: Call service to mark as read in database
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value); // Update state if the value is a single Date
    }
  };

  // Handle click outside for both calendar and notification popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element; // Ensure target is an Element

      if (
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        iconRef.current &&
        !iconRef.current.contains(target)
      ) {
        setShowCalendar(false); // Close the calendar
      }

      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        !target.closest(".notification-icon")
      ) {
        setIsPopupVisible(false); // Close the notification popup
        markAllAsRead();
      }
    };

    if (showCalendar || isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, isPopupVisible]);

  return (
    <header className="w-screen h-16 fixed top-0 rounded-b-lg flex items-center justify-center lg:justify-between px-4 z-20">
      {showBackIcon && (
        <div
          className="absolute left-4 flex items-center space-x-2 cursor-pointer lg:hidden"
          onClick={handleBackClick}
        >
          <span className="material-symbols-outlined text-xl">
            arrow_back_ios_new
          </span>
          <span className="font-medium">{backText}</span>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-start leading-tight">
          <h1 className="hidden lg:block font-custom text-2xl text-white mb-[-0.75rem]">
            GreenHabits
          </h1>
          <h2 className="hidden lg:block font-josefin text-sm text-white">
            Every step counts for the planet
          </h2>
        </div>
        <span>
          <img
            src={logotype}
            alt="App logo depicting a smiling Earth with leaves as hands."
            width="48"
            height="48"
          />
        </span>
      </div>

      <div className="absolute right-4 flex items-center space-x-2">
        {isHomePage && (
          <button
            ref={iconRef}
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
        )}
        <button
          onClick={togglePopup}
          aria-label="Toggle Notifications"
          className="notification-icon p-1 rounded bg-calmBlue relative"
        >
          <img
            src={notificationIcon}
            alt="notifications icon"
            className="w-6 h-6 svg"
            aria-hidden="true"
          />
          {notifications.some((notif) => !notif.read) && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>

        {isProfilePage && (
          <Link to="/settings">
            <img
              src={settingsIcon}
              alt="settings icon"
              className="w-6 h-6 svg"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-16 lg:right-0 lg:w-[50%] bg-cloudWhite p-4 shadow-lg rounded-lg z-30"
        >
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            className="react-calendar"
          />
        </div>
      )}
      {isPopupVisible && (
        <div ref={popupRef}>
          <NotificationPopup
            notifications={notifications}
            onClose={() => setIsPopupVisible(false)}
          />
        </div>
      )}
    </header>
  );
};
