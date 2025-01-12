import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer
        className="w-screen h-16 bg-green-100 fixed bottom-0 flex items-center justify-around rounded-t-lg"
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
              <span className="material-symbols-outlined" aria-hidden="true">
                home
              </span>
              <p className="mt-0">Home</p>
            </div>
          </Link>
          <Link to="/explore">
            <div
              role="button"
              aria-label="Go to Explore"
              className="flex flex-col items-center"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                description
              </span>
              <p>Explore</p>
            </div>
          </Link>
          <Link to="/profile">
            <div
              role="button"
              aria-label="Go to Profile"
              className="flex flex-col items-center"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                account_circle
              </span>
              <p>Profile</p>
            </div>
          </Link>
        </section>
      </footer>
    </>
  );
};
