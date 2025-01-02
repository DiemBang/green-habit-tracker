import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <p>This is Home</p>
      <Link to="/categories">
        <button
          className="fixed bottom-20 right-4 bg-green-500 text-white rounded-lg px-2 py-2 flex items-center"
          aria-label="Add Habit"
        >
          Add habit
          <span className="material-symbols-outlined text-2xl ml-2">
            add_circle
          </span>
        </button>
      </Link>
    </>
  );
};
