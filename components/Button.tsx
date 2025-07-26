interface ButtonInterface {
  children: React.ReactNode;
  disabled?: boolean;
  type: string;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

const Button = ({
  children,
  disabled = false,
  type,
  onClick,
  ariaLabel,
  className
}: ButtonInterface) => {
  const baseClasses = "font-semibold rounded focus-outline-none focus:ring-2 focus:ring-offset-2 transition";
  let typeClasees = "";

  switch (type) {
    case "add":
      typeClasees = "bg-blue-600 hover-bg-blue-700 text-white py-2 px-4 focus:ring-blue-400 disabled:bg-blue-200 disabled:cursor-not-allowed";
      break;
    case "increment":
      typeClasees = "w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:cursor-not-allowed focus:ring-blue-400 disabled:bg-blue-200";
      break;
    case "decrement":
      typeClasees = "w-8 h-8 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center disabled:cursor-not-allowed focus:ring-red-400 disabled:bg-red-200";
      break;
    case "remove":
      typeClasees = "text-red-600 hover:text-red-800 font-bold text-xl focus:outline-none";
      break;
    default:
      typeClasees;
  }
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseClasses} ${typeClasees} ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;