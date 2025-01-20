import { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={`w-[95%] mx-auto mb-6 p-6 bg-cloudWhite border rounded-lg shadow-md ${
        className || ""
      }`}
    >
      {children}
    </section>
  );
};
