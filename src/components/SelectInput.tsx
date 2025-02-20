import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { BiChevronDown } from "react-icons/bi";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grapes", value: "grapes" },
  { label: "Orange", value: "orange" },
];

const popularOptions = ["apple", "banana", "grapes"];

const SingleSelectWithPopular = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle selection (only one item can be selected)
  const handleSelection = (value: string) => {
    setSelectedValue(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-4 relative">
      {/* Selection Box */}
      <div
        className="border rounded-md p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-gray-700">
          {selectedValue ? options.find(o => o.value === selectedValue)?.label : "Select an option..."}
        </span>
        <BiChevronDown className="w-4 h-4" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-1 w-full border rounded-md bg-white shadow-md z-10" ref={dropdownRef}>
          {options.map(option => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedValue === option.value ? "bg-gray-200" : ""}`}
              onClick={() => handleSelection(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Popular Options */}
      <div className="flex flex-wrap gap-2">
        {popularOptions.map(option => (
          <Button
            key={option}
            variant={selectedValue === option ? "default" : "outline"}
            onClick={() => handleSelection(option)}
          >
            {options.find(o => o.value === option)?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SingleSelectWithPopular;
