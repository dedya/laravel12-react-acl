// SelectInputs.jsx
import React, { useState } from "react"; // Explicitly import React for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming JS file
import Label from "../Label"; // Assuming JS file
import Select from "../Select"; // Assuming JS file
import MultiSelect from "../MultiSelect"; // Assuming JS file

/**
 * @typedef {object} Option
 * @property {string} value - The value of the option.
 * @property {string} label - The display label of the option.
 */

/**
 * SelectInputs component demonstrates different types of select inputs,
 * including a single select dropdown and a multi-select component.
 */
export default function SelectInputs() {
	/** @type {Option[]} */
	const options = [
		{ value: "marketing", label: "Marketing" },
		{ value: "template", label: "Template" },
		{ value: "development", label: "Development" },
	];

	/**
	 * Handles the change event for the single Select component.
	 * @param {string} value - The selected value.
	 */
	const handleSelectChange = (value) => {
		console.log("Selected value:", value);
	};

	/** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
	const [selectedValues, setSelectedValues] = useState([]);

	/**
	 * @typedef {object} MultiOption
	 * @property {string} value - The value of the multi-select option.
	 * @property {string} text - The display text of the multi-select option.
	 * @property {boolean} selected - Initial selected state.
	 */

	/** @type {MultiOption[]} */
	const multiOptions = [
		{ value: "1", text: "Option 1", selected: false },
		{ value: "2", text: "Option 2", selected: false },
		{ value: "3", text: "Option 3", selected: false },
		{ value: "4", text: "Option 4", selected: false },
		{ value: "5", text: "Option 5", selected: false },
	];

	return (
		<ComponentCard title="Select Inputs">
			<div className="space-y-6">
				<div>
					<Label>Select Input</Label>
					<Select
						options={options}
						placeholder="Select Option"
						onChange={handleSelectChange}
						className="dark:bg-dark-900"
					/>
				</div>
				<div>
					<MultiSelect
						label="Multiple Select Options"
						options={multiOptions}
						defaultSelected={["1", "3"]}
						onChange={(values) => setSelectedValues(values)}
					/>
					<p className="sr-only">
						Selected Values: {selectedValues.join(", ")}
					</p>
				</div>
			</div>
		</ComponentCard>
	);
}