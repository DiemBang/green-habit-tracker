import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";
import homeCategoryIcon from "../assets/home-category.svg";

export const Categories = () => {
  return (
    <>
      <h2>Categories</h2>
      <Link to="/habitsPerCategory">
        <CategoryButton
          category={{ iconUrl: homeCategoryIcon, name: "Home" }}
        ></CategoryButton>
        <CategoryButton
          category={{ iconUrl: "", name: "Food" }}
        ></CategoryButton>
        <CategoryButton
          category={{ iconUrl: "", name: "On-the-go" }}
        ></CategoryButton>
        <CategoryButton
          category={{ iconUrl: "", name: "Work" }}
        ></CategoryButton>
        <CategoryButton
          category={{ iconUrl: "", name: "All" }}
        ></CategoryButton>
      </Link>
    </>
  );
};
