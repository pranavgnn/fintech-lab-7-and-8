import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500",
    secondary: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500",
    outline:
      "border border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-purple-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        isLoading ? "loading-pulse" : ""
      }`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};
