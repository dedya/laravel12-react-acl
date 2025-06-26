// Badge.jsx
import React from "react"; // No 'type' import needed
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * @typedef {"light" | "solid"} BadgeVariant
 * @typedef {"sm" | "md"} BadgeSize
 * @typedef {"primary" | "success" | "error" | "warning" | "info" | "light" | "dark"} BadgeColor
 */

/**
 * Badge component for displaying small, styled labels.
 *
 * @param {object} props - The props for the Badge component.
 * @param {BadgeVariant} [props.variant="light"] - The visual variant of the badge (light or solid).
 * @param {BadgeSize} [props.size="md"] - The size of the badge (sm or md).
 * @param {BadgeColor} [props.color="primary"] - The color scheme of the badge.
 * @param {React.ReactNode} [props.startIcon] - An optional icon or element to display at the beginning of the badge.
 * @param {React.ReactNode} [props.endIcon] - An optional icon or element to display at the end of the badge.
 * @param {React.ReactNode} props.children - The content to be displayed inside the badge.
 */
const Badge = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // Define size styles
  const sizeStyles = {
    sm: "text-theme-xs", // Smaller padding and font size
    md: "text-sm", // Default padding and font size
  };

  // Define color styles for variants
  const variants = {
    light: {
      primary:
        "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
      success:
        "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
      error:
        "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
      warning:
        "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
      info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
      light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
      dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
    },
    solid: {
      primary: "bg-brand-500 text-white dark:text-white",
      success: "bg-success-500 text-white dark:text-white",
      error: "bg-error-500 text-white dark:text-white",
      warning: "bg-warning-500 text-white dark:text-white",
      info: "bg-blue-light-500 text-white dark:text-white",
      light: "bg-gray-400 dark:bg-white/5 text-white dark:text-white/80",
      dark: "bg-gray-700 text-white dark:text-white",
    },
  };

  // Get styles based on size and color variant
  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

// PropTypes for runtime type checking in development
Badge.propTypes = {
  variant: PropTypes.oneOf(["light", "solid"]),
  size: PropTypes.oneOf(["sm", "md"]),
  color: PropTypes.oneOf([
    "primary",
    "success",
    "error",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  startIcon: PropTypes.node, // Can be any renderable React node
  endIcon: PropTypes.node,   // Can be any renderable React node
  children: PropTypes.node.isRequired, // Badge content is required
};

// Default props (optional, as they are already handled in destructuring)
/** 
Badge.defaultProps = {
  variant: "light",
  color: "primary",
  size: "md",
};
*/

export default Badge;