import { Link } from "react-router-dom";
import homeIcon from "/src/assets/header-footer-icons/home.svg";
import exploreIcon from "/src/assets/header-footer-icons/idea.svg";
import profileIcon from "/src/assets/header-footer-icons/profile-user.svg";

export const Footer = () => {
  return (
    <>
      <footer
        className="w-screen h-16 fixed bottom-0 flex items-center justify-around rounded-t-lg"
        role="contentinfo"
      >
        <section
          className="flex justify-around w-full"
          aria-label="Footer navigation"
        >
          <Link to="/home">
            <div
              role="button"
              aria-label="Go to Home"
              className="flex flex-col items-center"
            >
              <img
                src={homeIcon}
                alt="home icon"
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
              <p className="mt-0">Home</p>
            </div>
          </Link>
          <Link to="/explore">
            <div
              role="button"
              aria-label="Go to Explore"
              className="flex flex-col items-center"
            >
              <img
                src={exploreIcon}
                alt="explore icon"
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
              <p>Explore</p>
            </div>
          </Link>
          <Link to="/profile">
            <div
              role="button"
              aria-label="Go to Profile"
              className="flex flex-col items-center"
            >
              <img
                src={profileIcon}
                alt=""
                className="w-6 h-6 svg"
                aria-hidden="true"
              />
              <p>Profile</p>
            </div>
          </Link>
        </section>
      </footer>
    </>
  );
};
