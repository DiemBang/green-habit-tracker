import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";
import homeCategoryIcon from "../assets/category-icons/home-category.svg";
import foodCategoryIcon from "../assets/category-icons/food-category.png";
import onthegoCategoryIcon from "../assets/category-icons/onthego-category.png";
import workCategoryIcon from "../assets/category-icons/work-category.png";
import allCategoryIcon from "../assets/category-icons/all-category.png";
import { CardSection } from "../components/CardSection";

export const Categories = () => {
  return (
    <div className="p-6">
      <h3 className="mb-6">Categories</h3>
      <CardSection>
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <Link to="/habitsPerCategory/Home">
            <CategoryButton
              category={{ iconUrl: homeCategoryIcon, name: "Home" }}
            />
          </Link>
          <Link to="/habitsPerCategory/Food">
            <CategoryButton
              category={{ iconUrl: foodCategoryIcon, name: "Food" }}
            />
          </Link>
          <Link to="/habitsPerCategory/On-the-go">
            <CategoryButton
              category={{ iconUrl: onthegoCategoryIcon, name: "On-the-go" }}
            />
          </Link>
          <Link to="/habitsPerCategory/Work">
            <CategoryButton
              category={{ iconUrl: workCategoryIcon, name: "Workplace" }}
            />
          </Link>
          <Link to="/habitsPerCategory/All">
            <CategoryButton
              category={{ iconUrl: allCategoryIcon, name: "All" }}
            />
          </Link>
        </section>
      </CardSection>
    </div>
  );
};
