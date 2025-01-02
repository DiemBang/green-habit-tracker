import { useState } from "react";
import { ICategory } from "../models/ICategory";

export const CategoryButton = () => {
  const [category, setCategory] = useState<ICategory>({
    iconUrl: "",
    name: "Default Category",
  });
  return (
    <>
      <section className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 border-2 border-green-500">
        <slot className="mb-2">{category.iconUrl}</slot>
        <h3 className="text-lg font-medium">{category.name}</h3>
      </section>
    </>
  );
};
