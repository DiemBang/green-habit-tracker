import React from "react";

interface SettingButtonProps {
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: "default" | "danger";
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  children,
  showIcon = true,
  variant = "default",
}) => {
  const baseClasses =
    "flex items-center justify-between mb-2 border rounded-lg shadow-sm bg-cloudWhite pl-4 pr-2 h-10";
  const variantClasses =
    variant === "danger"
      ? "bg-red-600 border-red-700 hover:bg-red-700"
      : "bg-cloudWhite border-gray-300 hover:bg-gray-100";

  return (
    <article className={`${baseClasses} ${variantClasses}`}>
      <span>{children}</span>
      {showIcon && ( // Conditionally render the icon
        <span className={`material-symbols-outlined text-lg text-fontPrimary`}>
          chevron_right
        </span>
      )}
    </article>
  );
};
