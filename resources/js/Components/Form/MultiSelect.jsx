// MultiSelect.jsx
import React, { useState } from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * @typedef {object} MultiSelectOption
 * @property {string} value - The unique value for the option.
 * @property {string} text - The display text for the option.
 */

/**
 * MultiSelect component provides a dropdown for selecting multiple options.
 *
 * @param {object} props - The props for the MultiSelect component.
 * @param {string} props.label - The label for the multi-select input.
 * @param {MultiSelectOption[]} props.options - An array of option objects ({ value, text }).
 * @param {string[]} [props.defaultSelected=[]] - An array of values that should be pre-selected.
 * @param {function(string[]): void} [props.onChange] - Callback function triggered when selected options change. Receives an array of selected values.
 * @param {boolean} [props.disabled=false] - If true, the multi-select will be disabled.
 */
const MultiSelect = ({
	label,
	options,
	defaultSelected = [], // JavaScript default parameter
	onChange,
	disabled = false, // JavaScript default parameter
}) => {
	const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		if (!disabled) setIsOpen((prev) => !prev);
	};

	/**
	 * Handles selecting/deselecting an option.
	 * @param {string} optionValue - The value of the option to toggle.
	 */
	const handleSelect = (optionValue) => { // Removed type annotation
		const newSelectedOptions = selectedOptions.includes(optionValue)
			? selectedOptions.filter((value) => value !== optionValue)
			: [...selectedOptions, optionValue];

		setSelectedOptions(newSelectedOptions);
		onChange?.(newSelectedOptions); // Use optional chaining for onChange
	};

	/**
	 * Removes a selected option.
	 * @param {string} value - The value of the option to remove.
	 */
	const removeOption = (value) => { // Removed type annotation
		const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
		setSelectedOptions(newSelectedOptions);
		onChange?.(newSelectedOptions); // Use optional chaining for onChange
	};

	// Map selected values back to their display text
	const selectedValuesText = selectedOptions.map(
		(value) => options.find((option) => option.value === value)?.text || ""
	);

	return (
		<div className="w-full">
			<label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
				{label}
			</label>

			<div className="relative z-20 inline-block w-full">
				<div className="relative flex flex-col items-center">
					<div onClick={toggleDropdown} className="w-full">
						<div className="mb-2 flex h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300">
							<div className="flex flex-wrap flex-auto gap-2">
								{selectedValuesText.length > 0 ? (
									selectedValuesText.map((text, index) => (
										<div
											// Using index as key is generally discouraged if items can be reordered or added/removed.
											// If your 'options' array is stable and items don't change order, it's okay for simple cases.
											// Otherwise, use a unique ID from the option itself if available, or a library like 'uuid'.
											key={index}
											className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
										>
											<span className="flex-initial max-w-full">{text}</span>
											<div className="flex flex-row-reverse flex-auto">
												<div
													onClick={(e) => {
														e.stopPropagation(); // Prevent the dropdown from closing when removing an item
														removeOption(selectedOptions[index]);
													}}
													className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
												>
													{/* Close Icon SVG */}
													<svg
														className="fill-current"
														role="button"
														width="14"
														height="14"
														viewBox="0 0 14 14"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
														/>
													</svg>
												</div>
											</div>
										</div>
									))
								) : (
									// Placeholder input when no options are selected
									<input
										placeholder="Select option"
										className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-hidden appearance-none placeholder:text-gray-800 focus:border-0 focus:outline-hidden focus:ring-0 dark:placeholder:text-white/90"
										readOnly
										value="Select option" // Display placeholder text
									/>
								)}
							</div>
							<div className="flex items-center py-1 pl-1 pr-1 w-7">
								<button
									type="button"
									onClick={toggleDropdown}
									className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
								>
									{/* Dropdown arrow icon */}
									<svg
										className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					{/* Dropdown options container */}
					{isOpen && (
						<div
							className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg shadow-sm top-full max-h-select dark:bg-gray-900"
							onClick={(e) => e.stopPropagation()} // Prevent closing dropdown when clicking inside options
						>
							<div className="flex flex-col">
								{options.map((option, index) => (
									<div
										key={option.value || index} // Use option.value as key if available, fallback to index
										className={`hover:bg-primary/5 w-full cursor-pointer rounded-t border-b border-gray-200 dark:border-gray-800`}
										onClick={() => handleSelect(option.value)}
									>
										<div
											className={`relative flex w-full items-center p-2 pl-2 ${selectedOptions.includes(option.value)
													? "bg-primary/10"
													: ""
												}`}
										>
											<div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
												{option.text}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// PropTypes for runtime type checking in development
MultiSelect.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf( // Array of objects
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
		})
	).isRequired,
	defaultSelected: PropTypes.arrayOf(PropTypes.string), // Array of strings
	onChange: PropTypes.func, // A function
	disabled: PropTypes.bool, // A boolean
};

// No need for MultiSelect.defaultProps if using default parameters in destructuring

export default MultiSelect;