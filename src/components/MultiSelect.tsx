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
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  popularOptions = [],
  selectedValue,
  onChange,
  isMulti = false,
  placeholder = 'Select an option...',
  quickLabel,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle selection toggle (Ensuring Type Safety)
  const toggleSelection = (value: string): void => {
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
      setIsDropdownOpen(false); // Close dropdown for single select
    }
  };

  // Remove selected option (for multi-select)
  const removeSelection = (value: string): void => {
    if (isMulti) {
      const selectedArray: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      onChange(selectedArray.filter((v) => v !== value));
    }
  };

  // Close dropdown when clicking outside
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
        className='border border-[#0000001A] rounded-lg p-4 flex justify-between items-center cursor-pointer'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className='flex flex-wrap gap-3'>
          {Array.isArray(selectedValue) && selectedValue.length > 0 ? (
            selectedValue.map((value: string) => (
              <span
                key={value}
                className='flex items-center bg-[#FFEFED] p-2 rounded-md text-sm'>
                {options.find((o) => o.value === value)?.label}
                <IoClose
                  className='ml-1.5 text-xl cursor-pointer hover:text-red-500'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelection(value);
                  }}
                />
              </span>
            ))
          ) : selectedValue ? (
            <span className='text-black'>
              {options.find((o) => o.value === selectedValue)?.label}
            </span>
          ) : (
            <span className='text-gray-400'>{placeholder}</span>
          )}
        </div>
        <BiChevronDown className='w-6 h-6' />
      </div>

      {isDropdownOpen && (
        <div
          className='absolute mt-1 w-full border border-[#0000001A] rounded-md bg-white shadow-md z-10'
          ref={dropdownRef}>
          {options.map((option: Option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-[#FFEFED] ${
                (Array.isArray(selectedValue) &&
                  selectedValue.includes(option.value)) ||
                selectedValue === option.value
                  ? 'bg-[#FFEFED}'
                  : ''
              }`}
              onClick={() => toggleSelection(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
      <div className='mt-4'>
        <p className='mb-2'>{quickLabel}</p>
        {/* Popular Options */}
        <div className='flex flex-wrap gap-4'>
          {popularOptions.map((option: string) => (
            <button
              key={option}
              className={`p-3 rounded-md border border-[#0000001A] cursor-pointer ${
                (Array.isArray(selectedValue) &&
                  selectedValue.includes(option)) ||
                selectedValue === option
                  ? 'bg-[#FFEFED] text-black'
                  : 'bg-[#F7F7F7] text-black hover:bg-[#FFEFED]'
              }`}
              onClick={() => toggleSelection(option)}>
              {options.find((o) => o.value === option)?.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
