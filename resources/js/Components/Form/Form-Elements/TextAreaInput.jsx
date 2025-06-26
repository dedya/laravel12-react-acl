// TextAreaInput.jsx
import React, { useState } from "react"; 
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import TextArea from "../Input/TextArea"; // Assuming TextArea.jsx
import Label from "../Label"; // Assuming Label.jsx

/**
 * TextAreaInput component demonstrates various states of a textarea input field,
 * including a default, disabled, and error state with a hint.
 */
export default function TextAreaInput() {
	const [message, setMessage] = useState("");
	const [messageTwo, setMessageTwo] = useState("");

	return (
		<ComponentCard title="Textarea input field">
			<div className="space-y-6">
				{/* Default TextArea */}
				<div>
					<Label>Description</Label>
					<TextArea
						value={message}
						onChange={(value) => setMessage(value)}
						rows={6}
					/>
				</div>

				{/* Disabled TextArea */}
				<div>
					<Label>Description</Label>
					<TextArea rows={6} disabled />
				</div>

				{/* Error TextArea */}
				<div>
					<Label>Description</Label>
					<TextArea
						rows={6}
						value={messageTwo}
						error
						onChange={(value) => setMessageTwo(value)}
						hint="Please enter a valid message."
					/>
				</div>
			</div>
		</ComponentCard>
	);
}