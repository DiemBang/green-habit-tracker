import { useLocation } from "react-router-dom";
import logotype from "../../assets/category-icons/all-category.png";

export const Header = () => {
  const location = useLocation();

  // Check if the current path is '/home'
  const isHomePage = location.pathname === "/home";

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
              src="src/assets/header-footer-icons/notification.svg"
              alt="notifications icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <img
              src="src/assets/header-footer-icons/calendar-silhouette.svg"
              alt="calendar icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
          </div>
        )}
      </header>
    </>
  );
};
