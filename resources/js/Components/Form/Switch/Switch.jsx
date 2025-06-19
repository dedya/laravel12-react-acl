// Switch.jsx
import React, { useState } from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * @typedef {"blue" | "gray"} SwitchColor
 */

/**
 * Switch component provides a customizable toggle switch.
 *
 * @param {object} props - The props for the Switch component.
 * @param {string} props.label - The text label displayed next to the switch.
 * @param {boolean} [props.defaultChecked=false] - The initial checked state of the switch.
 * @param {boolean} [props.disabled=false] - If true, the switch will be disabled.
 * @param {function(boolean): void} [props.onChange] - Callback function triggered when the switch is toggled. Receives the new checked state.
 * @param {SwitchColor} [props.color="blue"] - The color theme of the switch ('blue' or 'gray').
 */
const Switch = ({
	label,
	defaultChecked = false, // JavaScript default parameter
	disabled = false, // JavaScript default parameter
	onChange,
	color = "blue", // JavaScript default parameter
}) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleToggle = () => {
		if (disabled) return; // Do nothing if disabled
		const newCheckedState = !isChecked;
		setIsChecked(newCheckedState); // Update internal state
		if (onChange) {
			onChange(newCheckedState); // Call parent's onChange handler
		}
	};

	// Determine background and knob styles based on color and checked state
	const switchColors =
		color === "blue"
			? {
				background: isChecked
					? "bg-brand-500" // Blue version - checked
					: "bg-gray-200 dark:bg-white/10", // Blue version - unchecked
				knob: isChecked
					? "translate-x-full bg-white" // Knob - checked (moves right)
					: "translate-x-0 bg-white", // Knob - unchecked (stays left)
			}
			: {
				background: isChecked
					? "bg-gray-800 dark:bg-white/10" // Gray version - checked
					: "bg-gray-200 dark:bg-white/10", // Gray version - unchecked
				knob: isChecked
					? "translate-x-full bg-white" // Knob - checked (moves right)
					: "translate-x-0 bg-white", // Knob - unchecked (stays left)
			};

	return (
		<label
			className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
				}`}
			onClick={handleToggle} // Toggle when the label itself or its children are clicked
		>
			<div className="relative">
				{/* Background track of the switch */}
				<div
					className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${disabled
							? "bg-gray-100 pointer-events-none dark:bg-gray-800" // Disabled background
							: switchColors.background // Active background based on color theme
						}`}
				></div>
				{/* Movable knob of the switch */}
				<div
					className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
				></div>
			</div>
			{label}
		</label>
	);
};

Switch.propTypes = {
	label: PropTypes.string.isRequired,
	defaultChecked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func, // onChange is a function that receives a boolean
	color: PropTypes.oneOf(["blue", "gray"]), // Must be 'blue' or 'gray'
};

export default Switch;