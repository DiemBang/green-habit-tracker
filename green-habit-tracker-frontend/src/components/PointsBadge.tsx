import { ReactNode } from "react";

interface PointsBadgeProps {
  children: ReactNode; // Accepts any valid React children
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({ children }) => {
  return (
    <>
      <div className="flex items-center bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded-md shadow-sm max-w-fit">
        <img
          src="../src/assets/coin.svg"
          alt="Points icon"
          className="w-5 h-5 mr-1"
        />
        {children}
      </div>
    </>
  );
};
