import React from 'react';
import clsx from 'clsx';

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
      className={clsx(
        'px-10 py-3 rounded-lg text-2xl transition-opacity disabled:opacity-50 font-semibold',
        className || 'bg-[#FF6347] text-white ' // Default bg if no className is provided
      )}
    >
      {children}
    </button>
  );
};

export default Button;
