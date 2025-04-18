import { Link } from "react-router-dom";
import homeIcon from "/src/assets/header-footer-icons/home.svg";
import exploreIcon from "/src/assets/header-footer-icons/explore.svg";
import profileIcon from "/src/assets/header-footer-icons/profile-user.svg";

export const Footer = () => {
  return (
    <>
      <footer
        className="w-screen h-16 lg:h-8 fixed bottom-0 flex items-center justify-around rounded-t-lg"
        role="contentinfo"
      >
        <section
          className="flex justify-around w-full lg:hidden"
          aria-label="Footer navigation"
        >
          <Link to="/home">
            <div
              role="button"
              aria-label="Go to Home"
              className="flex flex-col items-center group focus:outline-none"
            >
              <img
                src={homeIcon}
                alt="home icon"
                className="w-6 h-6 svg group-hover:svghover group-focus:svghover"
                aria-hidden="true"
              />
              <p className="mt-0 text-black group-hover:text-customGreen group-focus:text-customGreen">
                Home
              </p>
            </div>
          </Link>
          <Link to="/explore">
            <div
              role="button"
              aria-label="Go to Explore"
              className="flex flex-col items-center group focus:outline-none"
            >
              <img
                src={exploreIcon}
                alt="explore icon"
                className="w-6 h-6 svg group-hover:svghover group-focus:svghover"
                aria-hidden="true"
              />
              <p className="mt-0 text-black group-hover:text-customGreen group-focus:text-customGreen">
                Explore
              </p>
            </div>
          </Link>
          <Link to="/profile">
            <div
              role="button"
              aria-label="Go to Profile"
              className="flex flex-col items-center group focus:outline-none"
            >
              <img
                src={profileIcon}
                alt=""
                className="w-6 h-6 svg group-hover:svghover group-focus:svghover"
                aria-hidden="true"
              />
              <p className="mt-0 text-black group-hover:text-customGreen group-focus:text-customGreen">
                Profile
              </p>
            </div>
          </Link>
        </section>
        <section className="hidden lg:block text-xs">
          <p>© 2025 GreenHabits. All rights reserved.</p>
        </section>
      </footer>
    </>
  );
};
