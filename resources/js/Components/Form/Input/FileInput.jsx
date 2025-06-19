// FileInput.jsx
import React from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * FileInput component provides a styled HTML file input element.
 *
 * @param {object} props - The props for the FileInput component.
 * @param {string} [props.className] - Additional CSS classes to apply to the input element.
 * @param {function(React.ChangeEvent<HTMLInputElement>): void} [props.onChange] - Callback function triggered when a file is selected. Receives the change event.
 */
const FileInput = ({ className, onChange }) => {
  return (
    <input
      type="file"
      // The extensive Tailwind CSS classes are kept as in your original component.
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className || ''}`}
      onChange={onChange}
    />
  );
};

// PropTypes for runtime type checking in development
FileInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func, // onChange is a function that receives a React change event
};

export default FileInput;