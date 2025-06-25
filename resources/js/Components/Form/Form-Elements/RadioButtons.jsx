// RadioButtons.jsx
import React, { useState } from "react"; // Ensure React is imported for JSX
import ComponentCard from "../../Common/ComponentCard"; // Assuming ComponentCard.jsx
import Radio from "../Input/Radio"; // Assuming Radio.jsx

/**
 * RadioButtons component showcases various states of the Radio component,
 * including default, selected, and disabled radio buttons within a group.
 */
export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = useState("option2"); // Removed type annotation

  /**
   * Handles the change event for the radio buttons.
   * Updates the selectedValue state based on the clicked radio button's value.
   * @param {string} value - The value of the selected radio button.
   */
  const handleRadioChange = (value) => { // Removed type annotation
    setSelectedValue(value);
  };

  return (
    <ComponentCard title="Radio Buttons">
      <div className="flex flex-wrap items-center gap-8">
        {/* Default Radio Button */}
        <Radio
          id="radio1"
          name="group1" // Radio buttons in the same group must have the same 'name'
          value="option1"
          checked={selectedValue === "option1"}
          onChange={handleRadioChange}
          label="Default"
        />
        {/* Selected Radio Button */}
        <Radio
          id="radio2"
          name="group1"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={handleRadioChange}
          label="Selected"
        />
        {/* Disabled Radio Button */}
        <Radio
          id="radio3"
          name="group1"
          value="option3"
          checked={selectedValue === "option3"}
          onChange={handleRadioChange}
          label="Disabled"
          disabled={true} // Explicitly set to true
        />
      </div>
    </ComponentCard>
  );
}