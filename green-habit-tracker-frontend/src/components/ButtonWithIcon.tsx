import addIcon from "/src/assets/add2.svg";

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
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 px-2 py-1 font-bold bg-calmBlue rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    >
      <img src={addIcon} alt="Add Icon" className="w-4 h-4 ml-2 align-middle" />
      {text}
    </button>
  );
};
