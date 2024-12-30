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
          <div role="button" aria-label="Go to Home">
            <span className="material-symbols-outlined" aria-hidden="true">
              home
            </span>
          </div>
          <div role="button" aria-label="Go to Browse">
            <span className="material-symbols-outlined" aria-hidden="true">
              description
            </span>
          </div>
          <div role="button" aria-label="Go to Profile">
            <span className="material-symbols-outlined" aria-hidden="true">
              account_circle
            </span>
          </div>
        </section>
      </footer>
    </>
  );
};
