// CheckboxComponents.jsx
import React, { useState } from "react"; // Ensure React is imported for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import Checkbox from "../Input/Checkbox"; // Assuming Checkbox.jsx

/**
 * CheckboxComponents displays various states of the Checkbox component,
 * including default, checked, and disabled states.
 */
export default function CheckboxComponents() {
	const [isChecked, setIsChecked] = useState(false);
	const [isCheckedTwo, setIsCheckedTwo] = useState(true);
	const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);

	return (
		<ComponentCard title="Checkbox">
			<div className="flex items-center gap-4">
				{/* Default Checkbox */}
				<div className="flex items-center gap-3">
					<Checkbox checked={isChecked} onChange={setIsChecked} />
					<span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
						Default
					</span>
				</div>

				{/* Checked Checkbox with Label */}
				<div className="flex items-center gap-3">
					<Checkbox
						checked={isCheckedTwo}
						onChange={setIsCheckedTwo}
						label="Checked"
					/>
				</div>

				{/* Disabled Checkbox with Label */}
				<div className="flex items-center gap-3">
					<Checkbox
						checked={isCheckedDisabled}
						onChange={setIsCheckedDisabled}
						disabled // The `disabled` prop being present (without a value) defaults to true
						label="Disabled"
					/>
				</div>
			</div>
		</ComponentCard>
	);
}