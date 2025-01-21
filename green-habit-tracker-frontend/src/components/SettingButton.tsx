import React from "react";

interface SettingButtonProps {
  children: React.ReactNode;
  showIcon?: boolean;
  icon?: string;
  iconSize?: string;
  customIconStyle?: string;
  variant?: "default" | "danger";
  onClick?: () => void;
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  children,
  showIcon = true,
  icon = "chevron_right",
  iconSize = "text-lg",
  customIconStyle = "",
  variant = "default",
  onClick,
}) => {
  const baseClasses =
    "flex items-center justify-between mb-2 border rounded-lg shadow-sm bg-cloudWhite pl-4 pr-2 h-10";
  const variantClasses =
    variant === "danger"
      ? "bg-red-600 border-red-700 hover:bg-red-700"
      : "bg-cloudWhite border-gray-300 hover:bg-gray-100";

  return (
    <article className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
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
