import { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode; // Accepts any valid React children
}

export const CardSection: React.FC<CardSectionProps> = ({ children }) => {
  return (
    <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
      {children}
    </section>
  );
};
