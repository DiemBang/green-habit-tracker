import React from "react";

interface SettingButtonProps {
  children: React.ReactNode;
  showIcon?: boolean;
  icon?: string;
  iconSize?: string;
  customIconStyle?: string;
  variant?: "default" | "danger";
  className?: string;
  onClick?: () => void;
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  children,
  showIcon = true,
  icon = "chevron_right",
  iconSize = "text-lg",
  customIconStyle = "",
  variant = "default",
  className,
  onClick,
}) => {
  const baseClasses =
    "flex items-center justify-between mb-2 border rounded-lg shadow-sm bg-cardWhite pl-4 pr-2 h-10";
  const variantClasses =
    variant === "danger"
      ? "bg-red-600 border-red-700 hover:bg-red-700"
      : "bg-cardWhite border-gray-300 hover:bg-headerAndFooterColor";

  return (
    <article
      className={`${baseClasses} ${variantClasses} ${className} lg:w-[50%]`}
      onClick={onClick}
    >
      <span>{children}</span>
      {showIcon && (
        <span
          className={`material-symbols-outlined ${iconSize} ${customIconStyle}`}
        >
          {icon}
        </span>
      )}
    </article>
  );
};
