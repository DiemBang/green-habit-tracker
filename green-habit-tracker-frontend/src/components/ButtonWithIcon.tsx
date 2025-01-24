import addIcon from "/src/assets/add2.svg";
import removeIcon from "/src/assets/remove.svg"; // Import remove icon

interface ButtonProps {
  text: string; // Text displayed on the button
  onClick?: () => void; // Optional click handler
  className?: string; // Optional additional styles
}

export const ButtonWithIcon: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  const iconSrc =
    text === "Remove" || text === "Leave Challenge" ? removeIcon : addIcon;

  // Dynamic button color
  const buttonColor =
    text === "Remove" || text === "Leave Challenge"
      ? "bg-customRed"
      : "bg-calmBlue";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 px-2 py-1 font-bold rounded-lg focus:outline-none focus:ring-2 ${buttonColor} ${className}`}
    >
      <img
        src={iconSrc}
        alt={`${text} Icon`}
        className="w-4 h-4 ml-2 align-middle"
      />
      {text}
    </button>
  );
};
