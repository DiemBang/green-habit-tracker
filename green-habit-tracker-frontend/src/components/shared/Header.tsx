import logotype from "../../assets/all-category.png";

export const Header = () => {
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
      </header>
    </>
  );
};
