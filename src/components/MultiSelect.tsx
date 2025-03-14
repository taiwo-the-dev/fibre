import { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  popularOptions?: string[];
  selectedValue: string | string[];
  onChange: (value: string | string[]) => void;
  isMulti?: boolean;
  placeholder?: string;
  quickLabel?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  popularOptions = [],
  selectedValue,
  onChange,
  isMulti = false,
  placeholder = 'Select an option...',
  quickLabel,
  disabled = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleSelection = (value: string): void => {
    if (disabled) return; // Prevent selection if disabled

    if (isMulti) {
      const selectedArray: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      const newSelection: string[] = selectedArray.includes(value)
        ? selectedArray.filter((v) => v !== value)
        : [...selectedArray, value];
      onChange(newSelection);
    } else {
      onChange(value);
      setIsDropdownOpen(false);
    }
  };

  const removeSelection = (value: string): void => {
    if (disabled) return; // Prevent removal if disabled

    if (isMulti) {
      const selectedArray: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      onChange(selectedArray.filter((v) => v !== value));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='w-full relative'>
      <div
        className={`border border-[#0000001A] rounded-lg p-4 flex justify-between items-center ${
          disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'
        }`}
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className='flex flex-wrap gap-3'>
          {Array.isArray(selectedValue) && selectedValue.length > 0 ? (
            selectedValue.map((value: string) => (
              <span
                key={value}
                className={`flex items-center p-2 rounded-md text-sm ${
                  disabled ? 'bg-gray-300 text-gray-500' : 'bg-[#FFEFED]'
                }`}
              >
                {options.find((o) => o.value === value)?.label}
                {!disabled && (
                  <IoClose
                    className='ml-1.5 text-xl cursor-pointer hover:text-red-500'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelection(value);
                    }}
                  />
                )}
              </span>
            ))
          ) : selectedValue ? (
            <span className={`text-black ${disabled ? 'text-gray-500' : ''}`}>
              {options.find((o) => o.value === selectedValue)?.label}
            </span>
          ) : (
            <span className='text-gray-400'>{placeholder}</span>
          )}
        </div>
        <BiChevronDown className='w-6 h-6' />
      </div>

      {isDropdownOpen && !disabled && (
        <div
          className='absolute mt-1 w-full border border-[#0000001A] rounded-md bg-white shadow-md z-10'
          ref={dropdownRef}
        >
          {options.map((option: Option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-[#FFEFED] ${
                (Array.isArray(selectedValue) &&
                  selectedValue.includes(option.value)) ||
                selectedValue === option.value
                  ? 'bg-[#FFEFED]'
                  : ''
              }`}
              onClick={() => toggleSelection(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      <div className='mt-4'>
        {quickLabel && <p className='mb-2'>{quickLabel}</p>}

        <div className='flex flex-wrap gap-4'>
          {popularOptions.map((option: string) => (
            <button
              key={option}
              className={`p-3 rounded-md border border-[#0000001A] ${
                disabled
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : (Array.isArray(selectedValue) &&
                      selectedValue.includes(option)) ||
                    selectedValue === option
                  ? 'bg-[#FFEFED] text-black'
                  : 'bg-[#F7F7F7] text-black hover:bg-[#FFEFED]'
              }`}
              onClick={() => toggleSelection(option)}
              disabled={disabled}
            >
              {options.find((o) => o.value === option)?.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
