// InputGroup.jsx
import React from "react"; // Explicitly import React for JSX
import ComponentCard from "../../common/ComponentCard"; // Assuming JS file
import Label from "../Label"; // Assuming JS file
import Input from "../input/InputField"; // Assuming JS file
import { EnvelopeIcon } from "../../../utils/icons"; // Assuming JS file
import PhoneInput from "../Group-Input/PhoneInput"; // Assuming JS file

/**
 * InputGroup component demonstrates various input field groupings,
 * including an email input with an icon prefix and phone number inputs
 * with country code selectors at different positions.
 */
export default function InputGroup() {
	const countries = [
		{ code: "US", label: "+1" },
		{ code: "GB", label: "+44" },
		{ code: "CA", label: "+1" },
		{ code: "AU", label: "+61" },
	];

	/**
	 * Handles the change event for the PhoneInput component.
	 * @param {string} phoneNumber - The updated phone number.
	 */
	const handlePhoneNumberChange = (phoneNumber) => {
		console.log("Updated phone number:", phoneNumber);
	};

	return (
		<ComponentCard title="Input Group">
			<div className="space-y-6">
				<div>
					<Label>Email</Label>
					<div className="relative">
						<Input
							placeholder="info@gmail.com"
							type="text"
							className="pl-[62px]"
						/>
						<span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
							<EnvelopeIcon className="size-6" />
						</span>
					</div>
				</div>
				<div>
					<Label>Phone</Label>
					<PhoneInput
						selectPosition="start"
						countries={countries}
						placeholder="+1 (555) 000-0000"
						onChange={handlePhoneNumberChange}
					/>
				</div>{" "}
				<div>
					<Label>Phone</Label>
					<PhoneInput
						selectPosition="end"
						countries={countries}
						placeholder="+1 (555) 000-0000"
						onChange={handlePhoneNumberChange}
					/>
				</div>
			</div>
		</ComponentCard>
	);
}