// Checkbox.jsx
import React from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * Checkbox component for form inputs.
 *
 * @param {object} props - The props for the Checkbox component.
 * @param {string} [props.label] - The text label to display next to the checkbox.
 * @param {boolean} props.checked - Controls whether the checkbox is checked.
 * @param {string} [props.className=""] - Additional CSS classes for the input element.
 * @param {string} [props.id] - The unique HTML ID for the input element.
 * @param {function(boolean): void} props.onChange - Callback function triggered when the checkbox's state changes. Receives the new checked state.
 * @param {boolean} [props.disabled=false] - If true, the checkbox will be disabled.
 */
const Checkbox = ({
	label,
	checked,
	id,
	onChange,
	className = "", // JavaScript default parameter
	disabled = false, // JavaScript default parameter
}) => {
	return (
		<label
			className={`flex items-center space-x-3 group cursor-pointer ${disabled ? "cursor-not-allowed opacity-60" : ""
				}`}
		>
			<div className="relative w-5 h-5">
				<input
					id={id}
					type="checkbox"
					className={`w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          ${className}`}
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					disabled={disabled}
				/>
				{/* Checkmark icon for when the checkbox is checked and not disabled */}
				{checked && (
					<svg
						className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
					>
						<path
							d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
							stroke="white"
							strokeWidth="1.94437"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
				{/* Disabled checkmark icon for when the checkbox is checked AND disabled */}
				{disabled && checked && ( // Only show this if both disabled AND checked
					<svg
						className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
					>
						<path
							d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
							stroke="#E4E7EC" // A lighter gray color to indicate disabled state
							strokeWidth="2.33333"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</div>
			{label && (
				<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
					{label}
				</span>
			)}
		</label>
	);
};

// PropTypes for runtime type checking in development
Checkbox.propTypes = {
	label: PropTypes.string,
	checked: PropTypes.bool.isRequired,
	className: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default Checkbox;