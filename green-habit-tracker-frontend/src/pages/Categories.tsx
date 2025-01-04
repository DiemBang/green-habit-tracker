import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";
import homeCategoryIcon from "../assets/home-category.svg";
import foodCategoryIcon from "../assets/food-category.png";
import onthegoCategoryIcon from "../assets/onthego-category.png";
import workCategoryIcon from "../assets/work-category.png";
import allCategoryIcon from "../assets/all-category.png";

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
            category={{ iconUrl: foodCategoryIcon, name: "Food" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: onthegoCategoryIcon, name: "On-the-go" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: workCategoryIcon, name: "Work" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory">
          <CategoryButton
            category={{ iconUrl: allCategoryIcon, name: "All" }}
          ></CategoryButton>
        </Link>
      </section>
    </>
  );
};
