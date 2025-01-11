import { useLocation } from "react-router-dom";
import logotype from "../../assets/category-icons/all-category.png";

export const Header = () => {
  const location = useLocation();

  // Check if the current path is '/home'
  const isHomePage = location.pathname === "/home";

  return (
    <>
      <header className="w-screen h-16 bg-green-100 fixed top-0 rounded-b-lg flex items-center justify-center">
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
            <span className="material-symbols-outlined cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500">
              notifications
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500">
              calendar_today
            </span>
          </div>
        )}
      </header>
    </>
  );
};
