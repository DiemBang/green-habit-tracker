import { Link } from "react-router-dom";
import avatar from "../../assets/rabbit.svg";

export const SideBar = ({ name }: { name: string }) => {
  return (
    <aside className="hidden lg:flex bg-gray-100 w-40 p-4 pt-10 h-[calc(100vh-4rem)] top-16 flex-col fixed left-0 shadow-lg">
      {/* Profile Section */}
      <section className="flex flex-row items-center space-x-4 mb-6">
        <img
          src={avatar}
          alt="avatar profile"
          className="w-10 h-10 rounded-full shadow-md"
        />
        <p className="text-lg font-semibold">{name}</p>
      </section>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              dashboard
            </span>
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Dashboard
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              explore
            </span>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Explore
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              person
            </span>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Profile
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              info
            </span>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              About
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              school
            </span>
            <Link
              to="/tutorial"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Tutorial
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-gray-600">
              settings
            </span>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              Settings
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-red-600">
              logout
            </span>
            <Link
              to="/login"
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
