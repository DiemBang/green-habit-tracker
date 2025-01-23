import { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <section
      className={`w-[95%] mx-auto p-6 bg-cloudWhite border rounded-lg shadow-sm ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </section>
  );
};
