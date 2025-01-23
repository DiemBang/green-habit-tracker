import { ICategory } from "../models/ICategory";
interface CategoryButtonProps {
  category: ICategory;
}

export const CategoryButton = ({ category }: CategoryButtonProps) => {
  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-sm">
        <img
          className="h-12 mb-2"
          src={category.iconUrl}
          alt={"Icon for " + category.name}
        />
        <h4 className="mt-0">{category.name}</h4>
      </div>
    </>
  );
};
