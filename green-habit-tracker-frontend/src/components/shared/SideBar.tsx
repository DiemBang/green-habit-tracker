import { Link } from "react-router-dom";
import avatar from "../../assets/rabbit.svg";
import { PointsBadge } from "../PointsBadge";
import { IUser } from "../../models/IUser";
import dashboardIcon from "/src/assets/header-footer-icons/dashboard.svg";
import exploreIcon from "/src/assets/header-footer-icons/explore.svg";
import progressIcon from "/src/assets/header-footer-icons/progress.svg";
import profileIcon from "/src/assets/header-footer-icons/profile-user.svg";
import aboutIcon from "/src/assets/header-footer-icons/about.svg";
import tutorialIcon from "/src/assets/header-footer-icons/tutorial.svg";
import settingsIcon from "/src/assets/header-footer-icons/gear.svg";
import signoutIcon from "/src/assets/header-footer-icons/logout.svg";

export const SideBar = ({ user }: { user: IUser }) => {
  return (
    <aside className="hidden lg:flex bg-cloudWhite-100 w-40 p-4 pt-10 h-[calc(100vh-4rem)] top-16 flex-col fixed left-0 shadow-lg">
      {/* Profile Section */}
      <section className="flex flex-col items-center space-y-2 mb-6">
        <img
          src={avatar}
          alt="avatar profile"
          className="w-12 h-12 rounded-full shadow-md"
        />
        <p className="text-lg font-semibold">{user.name}</p>
        <PointsBadge>
          <span className="text-xl font-bold text-green-600">
            {user.points}
          </span>
        </PointsBadge>
      </section>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <img
              src={dashboardIcon}
              alt="Icon for dashboard page"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/home" className="hover:customGreen font-medium">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={exploreIcon}
              alt="explore icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/explore" className="hover:customGreen font-medium">
              Explore
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={progressIcon}
              alt="explore icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link
              to="/progress-summary"
              className="hover:customGreen font-medium"
            >
              Progress
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={profileIcon}
              alt="Icon for profile page"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/profile" className="hover:customGreen font-medium">
              Profile
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={aboutIcon}
              alt="about icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/about" className="hover:text-customGreen font-medium">
              About
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={tutorialIcon}
              alt="tutorial icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/tutorial" className="hover:text-customGreen font-medium">
              Tutorial
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={settingsIcon}
              alt="settings icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link to="/settings" className="hover:customGreen font-medium">
              Settings
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <img
              src={signoutIcon}
              alt="logout icon"
              className="w-6 h-6"
              aria-hidden="true"
            />
            <Link
              to="/login"
              className="text-red-600 hover:text-red-800 font-medium"
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
