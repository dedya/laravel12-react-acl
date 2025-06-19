import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types'; // Import PropTypes for type validation in JS

/**
 * @param {object} props - The props for the Dropdown component.
 * @param {boolean} props.isOpen - Controls the visibility of the dropdown.
 * @param {function(): void} props.onClose - Callback function to close the dropdown.
 * @param {React.ReactNode} props.children - The content to be rendered inside the dropdown.
 * @param {string} [props.className=""] - Additional CSS classes for the dropdown container.
 */


export const  Dropdown = ({
	isOpen,
  onClose,
  children,
  className = "",
}) => {
	const dropdownRef = useRef(null);

	useEffect(() => {

		const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&!event.target.closest(".dropdown-toggle")) {
        onClose();
      }
    };

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

	}, [onClose]);


	if (!isOpen) return null;

	return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};



// PropTypes for runtime type checking in development
Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired, // PropTypes.node covers anything renderable by React
  className: PropTypes.string,
};

// Default props if you want to explicitly define them separately from destructuring
/*Dropdown.defaultProps = {
  className: "",
};*/

