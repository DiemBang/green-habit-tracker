import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";
import homeCategoryIcon from "../assets/home-category.svg";

export const Categories = () => {
  return (
    <>
      <h2>Categories</h2>
      <section className="grid grid-cols-2 gap-4">
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: homeCategoryIcon, name: "Home" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: "", name: "Food" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: "", name: "On-the-go" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: "", name: "Work" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: "", name: "All" }}
          ></CategoryButton>
        </Link>
      </section>
    </>
  );
};
