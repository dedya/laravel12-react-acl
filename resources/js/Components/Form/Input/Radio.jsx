// Radio.jsx
import React from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * Radio component renders a custom-styled radio button.
 * It's designed to be used within a group of radio buttons, sharing the same `name` prop.
 *
 * @param {object} props - The props for the Radio component.
 * @param {string} props.id - A unique HTML ID for the radio input. Used for `htmlFor` on the label.
 * @param {string} props.name - The name attribute for the radio input. All radios in a group must have the same name.
 * @param {string} props.value - The value associated with this radio button.
 * @param {boolean} props.checked - Controls whether this radio button is currently checked.
 * @param {string} props.label - The text label displayed next to the radio button.
 * @param {function(string): void} props.onChange - Callback function triggered when the radio button's checked state changes. Receives the `value` of the clicked radio.
 * @param {string} [props.className=""] - Optional additional CSS classes to apply to the label element.
 * @param {boolean} [props.disabled=false] - If true, the radio button will be disabled.
 */
const Radio = ({
	id,
	name,
	value,
	checked,
	label,
	onChange,
	className = "", // JavaScript default parameter
	disabled = false, // JavaScript default parameter
}) => {
	return (
		<label
			htmlFor={id}
			className={`relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${disabled
					? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
					: "text-gray-700 dark:text-gray-400"
				} ${className}`}
		>
			<input
				id={id}
				name={name}
				type="radio"
				value={value}
				checked={checked}
				// Only call onChange if not disabled.
				// The event object is implicitly available but you only need the value here.
				onChange={() => !disabled && onChange(value)}
				className="sr-only" // Visually hide the native radio button
				disabled={disabled} // Apply disabled attribute to the native input
			/>
			{/* Custom styled radio button circle */}
			<span
				className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${checked
						? "border-brand-500 bg-brand-500" // Styles when checked
						: "bg-transparent border-gray-300 dark:border-gray-700" // Styles when unchecked
					} ${disabled
						? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700" // Styles when disabled
						: ""
					}`}
			>
				{/* Inner dot of the custom radio button */}
				<span
					className={`h-2 w-2 rounded-full bg-white ${checked ? "block" : "hidden"
						}`}
				></span>
			</span>
			{label}
		</label>
	);
};

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Radio;