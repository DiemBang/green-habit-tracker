import { ICategory } from "../models/ICategory";
interface CategoryButtonProps {
  category: ICategory;
}

export const CategoryButton = ({ category }: CategoryButtonProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 w-full h-32">
        <img
          className="mb-2 w-16 h-16"
          src={category.iconUrl}
          alt={"Icon for " + category.name}
        />
        <h3 className="text-lg font-medium">{category.name}</h3>
      </div>
    </>
  );
};
