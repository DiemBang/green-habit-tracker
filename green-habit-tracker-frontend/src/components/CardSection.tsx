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
      className={`p-6 my-3 lg:mt-3 bg-cardWhite border rounded-lg shadow-sm ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </section>
  );
};
