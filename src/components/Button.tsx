import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
        variant === "default"
          ? "bg-[#FFEFED] hover:bg-[#FFEFED]"
          : "border border-gray-300 text-black hover:bg-[#FFEFED]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
