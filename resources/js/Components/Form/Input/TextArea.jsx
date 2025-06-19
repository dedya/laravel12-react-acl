// TextArea.jsx
import React from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * TextArea component for multi-line text input.
 * It provides customizable placeholder, rows, value, change handler, and styling.
 * Also supports disabled, error states, and a hint message.
 *
 * @param {object} props - The props for the TextArea component.
 * @param {string} [props.placeholder="Enter your message"] - The placeholder text for the textarea.
 * @param {number} [props.rows=3] - The number of visible rows in the textarea.
 * @param {string} [props.value=""] - The current value of the textarea.
 * @param {function(string): void} [props.onChange] - Callback function triggered when the textarea value changes. Receives the new value as a string.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the textarea.
 * @param {boolean} [props.disabled=false] - If true, the textarea will be disabled.
 * @param {boolean} [props.error=false] - If true, applies error styling to the textarea.
 * @param {string} [props.hint=""] - A hint message displayed below the textarea.
 */
const TextArea = ({
	placeholder = "Enter your message", // JavaScript default parameter
	rows = 3, // JavaScript default parameter
	value = "", // JavaScript default parameter
	onChange, // Callback for changes
	className = "", // JavaScript default parameter
	disabled = false, // JavaScript default parameter
	error = false, // JavaScript default parameter
	hint = "", // JavaScript default parameter
}) => {
	// Removed type annotation for event
	const handleChange = (e) => {
		if (onChange) {
			onChange(e.target.value);
		}
	};

	let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

	if (disabled) {
		textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
	} else if (error) {
		textareaClasses += ` bg-transparent border-error-500 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-error-500 dark:bg-gray-900 dark:text-error-400 dark:focus:border-error-800`;
	} else {
		textareaClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
	}
	// There was a typo 'opacity40' and some redundant classes like 'text-gray-900' repeated
	// I've cleaned those up based on common Tailwind patterns assuming they were errors.

	return (
		<div className="relative">
			<textarea
				placeholder={placeholder}
				rows={rows}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className={textareaClasses}
			/>
			{hint && (
				<p
					className={`mt-2 text-sm ${error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
						}`}
				>
					{hint}
				</p>
			)}
		</div>
	);
};

// PropTypes for runtime type checking in development
TextArea.propTypes = {
	placeholder: PropTypes.string,
	rows: PropTypes.number,
	value: PropTypes.string,
	onChange: PropTypes.func, // onChange is a function that receives a string
	className: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	hint: PropTypes.string,
};

// No need for TextArea.defaultProps if using default parameters in destructuring

export default TextArea;