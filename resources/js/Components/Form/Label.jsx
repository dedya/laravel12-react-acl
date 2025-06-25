// Label.jsx
import React from "react"; 
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * Label component for form elements.
 * It applies default styling and merges additional classes.
 *
 * @param {object} props - The props object.
 * @param {string} [props.htmlFor] - The ID of the form element the label is associated with.
 * @param {React.ReactNode} props.children - The content to be rendered inside the label.
 * @param {string} [props.className] - Optional additional CSS classes for styling.
 */
const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
          className,
        ),
      )}
    >
      {children}
    </label>
  );
};

// PropTypes for Label
Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired, // Children are required and can be any renderable React node
  className: PropTypes.string,
};

export default Label;