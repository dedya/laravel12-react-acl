// PhoneInput.jsx
import React, { useState } from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * @typedef {object} CountryCode
 * @property {string} code - The country code (e.g., "US", "GB").
 * @property {string} label - The dialing code (e.g., "+1", "+44").
 */

/**
 * PhoneInput component provides an input field for phone numbers with an integrated country code selector.
 *
 * @param {object} props - The props for the PhoneInput component.
 * @param {CountryCode[]} props.countries - An array of country code objects ({ code, label }).
 * @param {string} [props.placeholder="+1 (555) 000-0000"] - Placeholder text for the phone number input.
 * @param {function(string): void} [props.onChange] - Callback function triggered when the phone number or country code changes. Receives the full phone number string (including dialing code).
 * @param {"start" | "end"} [props.selectPosition="start"] - Determines whether the country code dropdown appears at the "start" or "end" of the input.
 */
const PhoneInput = ({
	countries,
	placeholder = "+1 (555) 000-0000", // JavaScript default parameter
	onChange,
	selectPosition = "start", // JavaScript default parameter
}) => {
	const [selectedCountry, setSelectedCountry] = useState("US");
	const [phoneNumber, setPhoneNumber] = useState("+1"); // Initialize with a default dial code

	// Create a mapping from country code to dial code for easy lookup
	// @type {Record<string, string>}
	const countryCodes = countries.reduce(
		(acc, { code, label }) => ({ ...acc, [code]: label }),
		{}
	);

	/**
	 * Handles the change event for the country code select dropdown.
	 * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object from the select change.
	 */
	const handleCountryChange = (e) => {
		const newCountry = e.target.value;
		const newPhoneNumberPrefix = countryCodes[newCountry] || ""; // Get the dial code for the new country
		setSelectedCountry(newCountry);
		setPhoneNumber(newPhoneNumberPrefix); // Update phoneNumber state with the dial code
		if (onChange) {
			onChange(newPhoneNumberPrefix); // Notify parent of change
		}
	};

	/**
	 * Handles the change event for the phone number input field.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input change.
	 */
	const handlePhoneNumberChange = (e) => {
		const newPhoneNumber = e.target.value;
		setPhoneNumber(newPhoneNumber);
		if (onChange) {
			onChange(newPhoneNumber); // Notify parent of change
		}
	};

	return (
		<div className="relative flex">
			{/* Dropdown position: Start */}
			{selectPosition === "start" && (
				<div className="absolute">
					<select
						value={selectedCountry}
						onChange={handleCountryChange}
						className="appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
					>
						{countries.map((country) => (
							<option
								key={country.code}
								value={country.code}
								className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
							>
								{country.code}
							</option>
						))}
					</select>
					{/* Custom dropdown arrow for the select */}
					<div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400">
						<svg
							className="stroke-current"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			)}

			{/* Input field */}
			<input
				type="tel" // Use type="tel" for phone numbers
				value={phoneNumber}
				onChange={handlePhoneNumberChange}
				placeholder={placeholder}
				className={`dark:bg-dark-900 h-11 w-full ${selectPosition === "start" ? "pl-[84px] rounded-l-none" : "pr-[84px] rounded-r-none" // Adjust padding and rounding based on selectPosition
					} rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
			/>

			{/* Dropdown position: End */}
			{selectPosition === "end" && (
				<div className="absolute right-0">
					<select
						value={selectedCountry}
						onChange={handleCountryChange}
						className="appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
					>
						{countries.map((country) => (
							<option
								key={country.code}
								value={country.code}
								className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
							>
								{country.code}
							</option>
						))}
					</select>
					{/* Custom dropdown arrow for the select */}
					<div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none right-3 dark:text-gray-400">
						<svg
							className="stroke-current"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			)}
		</div>
	);
};

// PropTypes for runtime type checking in development
PhoneInput.propTypes = {
	countries: PropTypes.arrayOf( // Array of CountryCode objects
		PropTypes.shape({
			code: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	selectPosition: PropTypes.oneOf(["start", "end"]), // Must be 'start' or 'end'
};

// No need for PhoneInput.defaultProps if using default parameters in destructuring

export default PhoneInput;