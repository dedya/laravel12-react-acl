// Input.jsx
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * @typedef {"text" | "number" | "email" | "password" | "date" | "time" | string} InputType
 */

/**
 * Reusable Input component for various form fields.
 * It handles different types, states (success/error/disabled), and displays hints.
 *
 * @param {object} props - The props for the Input component.
 * @param {InputType} [props.type="text"] - The type of the input (e.g., "text", "number", "email", "password", "date", "time").
 * @param {string} [props.id] - The unique HTML ID for the input element.
 * @param {string} [props.name] - The name attribute for the input element.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string | number} [props.value] - The current value of the input.
 * @param {function(React.ChangeEvent<HTMLInputElement>): void} [props.onChange] - Callback function triggered when the input value changes.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the input element.
 * @param {string} [props.min] - The minimum value for number or date/time inputs.
 * @param {string} [props.max] - The maximum value for number or date/time inputs.
 * @param {number} [props.step] - The step value for number inputs.
 * @param {boolean} [props.disabled=false] - If true, the input will be disabled.
 * @param {boolean} [props.success=false] - If true, applies success styling to the input.
 * @param {boolean} [props.error=false] - If true, applies error styling to the input.
 * @param {string} [props.hint] - A hint message displayed below the input.
 */
const Input = ({
	type = "text",
	id,
	name,
	placeholder,
	value,
	onChange,
	className = "",
	min,
	max,
	step,
	isFocused = false,
	disabled = false,
	success = false,
	error = false,
	hint,
},ref,) => {
	let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

	if (disabled) {
		inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`; // Removed duplicate opacity-40
	} else if (error) {
		inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
	} else if (success) {
		inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
	} else {
		inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
	}

	const localRef = useRef(null);

	useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

	useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

	return (
		<div className="relative">
			<input
				type={type}
				id={id}
				ref={localRef}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				className={inputClasses}
			/>

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
		</div>
	);
};

// PropTypes for runtime type checking in development
Input.propTypes = {
	type: PropTypes.string, // Accepts various string types like "text", "email", etc.
	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Value can be string or number
	onChange: PropTypes.func, // onChange is a function
	className: PropTypes.string,
	min: PropTypes.string, // For date/time or number inputs
	max: PropTypes.string, // For date/time or number inputs
	step: PropTypes.number, // For number inputs
	disabled: PropTypes.bool,
	success: PropTypes.bool,
	error: PropTypes.bool,
	hint: PropTypes.string,
};

// No need for Input.defaultProps if using default parameters in destructuring

export default forwardRef( Input );