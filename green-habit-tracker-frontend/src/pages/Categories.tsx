import { Link } from "react-router-dom";
import { CategoryButton } from "../components/CategoryButton";

export const Categories = () => {
  return (
    <>
      <h2>Categories</h2>
      <Link to="/habitsPerCategory">
        <CategoryButton></CategoryButton>
      </Link>
    </>
  );
};
