interface ButtonProps {
  text: string; // Text displayed on the button
  onClick?: () => void; // Optional click handler
  className?: string; // Optional additional styles
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 px-2 py-1 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    >
      <span className="material-symbols-outlined">add</span>
      {text}
    </button>
  );
};
