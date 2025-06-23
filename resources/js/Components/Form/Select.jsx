// Select.jsx
import React, { useState } from "react"; 
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * @typedef {object} Option
 * @property {string} value - The unique value for the select option.
 * @property {string} label - The display label for the select option.
 */

/**
 * Select component for dropdown menus.
 *
 * @param {object} props - The props for the Select component.
 * @param {Option[]} props.options - An array of option objects ({ value, label }) for the dropdown.
 * @param {string} [props.placeholder="Select an option"] - The placeholder text displayed when no option is selected.
 * @param {function(string): void} props.onChange - Callback function triggered when an option is selected. Receives the selected value.
 * @param {string} [props.className=""] - Additional CSS classes for the select element.
 * @param {string} [props.defaultValue=""] - The initial selected value.
 */
const Select = ({
  name,
  options,
  value,
  placeholder = "Select an option", // JavaScript default parameter
  onChange,
  className = "", // JavaScript default parameter
  defaultValue = "", 
  hint,
  success = false,
  error = false,// JavaScript default parameter
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState(defaultValue); // Removed type annotation

  // Removed type annotation for event
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  if (error) {
		className += ` rounded-lg border border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
	} else {
    className +=` dark:border-gray-700 dark:focus:border-brand-800`;
  }

  return (
    <>
    <select
      id={name}
      name={name}
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  ${className} ${selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"} `}
      value={value}
      onChange={onChange}
    >
      {/* Placeholder option */}
      <option
        value=""
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}

    </select>
    {hint && (
				<p
					className={`mt-1.5 text-xs ${error
							? "text-error-500"
							: success
								? "text-success-500"
								: "text-gray-500"
						}`}
				>
					{hint}
				</p>
			)}
      
      </>

    
  );
};

// PropTypes for runtime type checking in development
/*
Select.propTypes = {
  options: PropTypes.arrayOf( // Array of objects
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, // onChange is a required function
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};*/

// No need for Select.defaultProps if using default parameters in destructuring

export default Select;