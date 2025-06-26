// InputStates.jsx
import React, { useState } from "react"; // Explicitly import React for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import Input from "../Input/InputField"; // Assuming InputField.jsx
import Label from "../Label"; // Assuming Label.jsx

/**
 * InputStates component demonstrates various states of an input field,
 * including error, success, and disabled states, with dynamic hints.
 */
export default function InputStates() {
	const [email, setEmail] = useState("");
	const [emailTwo, setEmailTwo] = useState("");
	const [error, setError] = useState(false);

	/**
	 * Simulates a basic email validation check.
	 * @param {string} value - The email string to validate.
	 * @returns {boolean} True if the email is valid, false otherwise.
	 */
	const validateEmail = (value) => { // Removed type annotation
		const isValidEmail =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
		setError(!isValidEmail);
		return isValidEmail;
	};

	/**
	 * Handles the change event for the first email input.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input change.
	 */
	const handleEmailChange = (e) => { // Removed type annotation
		const value = e.target.value;
		setEmail(value);
		validateEmail(value);
	};

	/**
	 * Handles the change event for the second email input.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input change.
	 */
	const handleEmailTwoChange = (e) => { // Removed type annotation
		const value = e.target.value;
		setEmailTwo(value);
		// Note: This validateEmail will affect the same 'error' state,
		// potentially causing both inputs to show the same validation status.
		// If you need independent validation for email and emailTwo,
		// you'll need separate error states (e.g., [errorEmail, setErrorEmail], [errorEmailTwo, setErrorEmailTwo]).
		validateEmail(value);
	};

	return (
		<ComponentCard
			title="Input States"
			desc="Validation styles for error, success and disabled states on form controls."
		>
			<div className="space-y-5 sm:space-y-6">
				{/* Error Input */}
				<div>
					<Label>Email</Label>
					<Input
						type="email"
						value={email}
						error={error} // This 'error' state is shared
						onChange={handleEmailChange}
						placeholder="Enter your email"
						hint={error ? "This is an invalid email address." : ""}
					/>
				</div>

				{/* Success Input */}
				<div>
					<Label>Email</Label>
					<Input
						type="email"
						value={emailTwo}
						success={!error} // This '!error' state is also shared
						onChange={handleEmailTwoChange}
						placeholder="Enter your email"
						hint={!error ? "This is a success message." : ""}
					/>
				</div>

				{/* Disabled Input */}
				<div>
					<Label>Email</Label>
					<Input
						type="text"
						value="disabled@example.com"
						disabled={true} // Explicitly set to true
						placeholder="Disabled email"
					/>
				</div>
			</div>
		</ComponentCard>
	);
}