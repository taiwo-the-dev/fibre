import React from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}> 
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`mt-1 p-2 w-full border rounded-lg appearance-none focus:border-[#FFCFC6] outline-none transition-all
          autofill:bg-transparent autofill:text-fill-current ${
            error ? "border-red-500" : "border-gray-300"
          }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
