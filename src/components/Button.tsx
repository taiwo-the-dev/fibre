import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-10 py-3 rounded-lg bg-[#FF6347] cursor-pointer text-white text-2xl transition-opacity disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
