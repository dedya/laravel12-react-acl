// DropdownItem.jsx
import React from "react"; // No 'type' import needed
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * @param {object} props - The props for the DropdownItem component.
 * @param {"a" | "button"} [props.tag="button"] - The HTML tag to render, either "a" for link or "button".
 * @param {string} [props.to] - The destination path if `tag` is "a". Requires `react-router`.
 * @param {function(): void} [props.onClick] - Callback function for the click event.
 * @param {function(): void} [props.onItemClick] - Another optional callback function for the item click event.
 * @param {string} [props.baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"] - Base CSS classes for styling.
 * @param {string} [props.className=""] - Additional CSS classes to apply.
 * @param {React.ReactNode} props.children - The content to be rendered inside the dropdown item.
 */
export const DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  // No type annotation for event
  const handleClick = (event) => {
    // Only prevent default if it's a button, as 'a' tags with 'to' are handled by React Router Link
    if (tag === "button") {
      event.preventDefault(); // Prevent default button behavior (e.g., form submission)
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && to) {
    return (
      <Link href={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  // Fallback to button if tag is not 'a' or 'to' is not provided
  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};

// PropTypes for runtime type checking in development
DropdownItem.propTypes = {
  tag: PropTypes.oneOf(["a", "button"]), // Can be 'a' or 'button'
  to: PropTypes.string,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired, // Requires content
};

// Default props (optional, as they are handled in destructuring)
/*
DropdownItem.defaultProps = {
  tag: "button",
  baseClassName: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className: "",
};
*/