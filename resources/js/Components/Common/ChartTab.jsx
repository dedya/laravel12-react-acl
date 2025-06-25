// ChartTab.jsx
import React, { useState } from "react"; 
/**
 * ChartTab component provides a set of toggleable buttons for chart data views.
 */
const ChartTab = () => {
  // Removed type annotation for useState
  const [selected, setSelected] = useState("optionOne");

  /**
   * Generates the appropriate CSS class for a button based on its selected state.
   * @param {string} option - The option identifier for the button ("optionOne", "optionTwo", or "optionThree").
   * @returns {string} The CSS classes for the button.
   */
  const getButtonClass = (option) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setSelected("optionOne")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "optionOne"
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setSelected("optionTwo")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "optionTwo"
        )}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => setSelected("optionThree")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "optionThree"
        )}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;