import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";
import homeCategoryIcon from "../assets/category-icons/home-category.svg";
import foodCategoryIcon from "../assets/category-icons/food-category.png";
import onthegoCategoryIcon from "../assets/category-icons/onthego-category.png";
import workCategoryIcon from "../assets/category-icons/work-category.png";
import allCategoryIcon from "../assets/category-icons/all-category.png";

export const Categories = () => {
  return (
    <>
      <h2>Categories</h2>
      <section className="grid grid-cols-2 gap-4">
        <Link to="/habitsPerCategory/Home">
          <CategoryButton
            category={{ iconUrl: homeCategoryIcon, name: "Home" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory/Food">
          <CategoryButton
            category={{ iconUrl: foodCategoryIcon, name: "Food" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory/On-the-go">
          <CategoryButton
            category={{ iconUrl: onthegoCategoryIcon, name: "On-the-go" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory/Work">
          <CategoryButton
            category={{ iconUrl: workCategoryIcon, name: "Workplace" }}
          ></CategoryButton>
        </Link>
        <Link to="/habitsPerCategory/All">
          <CategoryButton
            category={{ iconUrl: allCategoryIcon, name: "All" }}
          ></CategoryButton>
        </Link>
      </section>
    </>
  );
};
