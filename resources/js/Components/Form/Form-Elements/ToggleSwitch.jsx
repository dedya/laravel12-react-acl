// ToggleSwitch.jsx
import React from "react"; // Ensure React is imported for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import Switch from "../Switch/Switch"; // Assuming Switch.jsx

/**
 * ToggleSwitch component showcases different states of the Switch component,
 * including default, checked, and disabled switches in both primary and gray colors.
 */
export default function ToggleSwitch() {
	/**
	 * Handles the change event for the Switch component.
	 * Logs the current state of the switch to the console.
	 * @param {boolean} checked - The new checked state of the switch.
	 */
	const handleSwitchChange = (checked) => { // Removed type annotation
		console.log("Switch is now:", checked ? "ON" : "OFF");
	};

	return (
		<ComponentCard title="Toggle switch input">
			<div className="flex gap-4">
				{/* Default Switches (Primary Color) */}
				<Switch
					label="Default"
					defaultChecked={true}
					onChange={handleSwitchChange}
				/>
				<Switch
					label="Checked"
					defaultChecked={true}
					onChange={handleSwitchChange}
				/>
				<Switch label="Disabled" disabled={true} />
			</div>{" "}
			<div className="flex gap-4">
				{/* Gray Color Switches */}
				<Switch
					label="Default"
					defaultChecked={true}
					onChange={handleSwitchChange}
					color="gray"
				/>
				<Switch
					label="Checked"
					defaultChecked={true}
					onChange={handleSwitchChange}
					color="gray"
				/>
				<Switch label="Disabled" disabled={true} color="gray" />
			</div>
		</ComponentCard>
	);
}