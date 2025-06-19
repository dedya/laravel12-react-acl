// FileInputExample.jsx
import React from "react"; // Explicitly import React for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import FileInput from "../Input/FileInput"; // Assuming FileInput.jsx
import Label from "../Label"; // Assuming Label.jsx

/**
 * FileInputExample component demonstrates the usage of the FileInput component
 * for handling file uploads.
 */
export default function FileInputExample() {
	/**
	 * Handles the change event for the file input.
	 * Logs the name of the selected file to the console.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The event object from the input change.
	 */
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			console.log("Selected file:", file.name);
		}
	};

	return (
		<ComponentCard title="File Input">
			<div>
				<Label>Upload file</Label>
				<FileInput onChange={handleFileChange} className="custom-class" />
			</div>
		</ComponentCard>
	);
}