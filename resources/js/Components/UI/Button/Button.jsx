// Button.jsx
import React from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * @typedef {"sm" | "md"} ButtonSize
 * @typedef {"primary" | "outline"} ButtonVariant
 */

/**
 * Reusable Button component with customizable size, variant, and icon support.
 *
 * @param {object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button (e.g., text, icon).
 * @param {ButtonSize} [props.size="md"] - The size of the button ('sm' or 'md').
 * @param {ButtonVariant} [props.variant="primary"] - The visual variant of the button ('primary' or 'outline').
 * @param {React.ReactNode} [props.startIcon] - An optional icon or element to display before the button content.
 * @param {React.ReactNode} [props.endIcon] - An optional icon or element to display after the button content.
 * @param {function(): void} [props.onClick] - Callback function to be executed when the button is clicked.
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the button.
 */
const Button = ({
  children,
  size = "md", // JavaScript default parameter
  variant = "primary", // JavaScript default parameter
  startIcon,
  endIcon,
  onClick,
  className = "", // JavaScript default parameter
  disabled = false, // JavaScript default parameter
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

// PropTypes for runtime type checking in development
Button.propTypes = {
  children: PropTypes.node.isRequired, // Button content is required
  size: PropTypes.oneOf(["sm", "md"]), // Must be 'sm' or 'md'
  variant: PropTypes.oneOf(["primary", "outline"]), // Must be 'primary' or 'outline'
  startIcon: PropTypes.node, // Can be any renderable React node
  endIcon: PropTypes.node,   // Can be any renderable React node
  onClick: PropTypes.func,   // Must be a function
  disabled: PropTypes.bool,  // Must be a boolean
  className: PropTypes.string, // Must be a string
};

// No need for Button.defaultProps if using default parameters in destructuring

export default Button;