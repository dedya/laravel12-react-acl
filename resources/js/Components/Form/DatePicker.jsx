// DatePicker.jsx
import React, { useEffect } from "react"; 
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label"; 
import { CalenderIcon } from "../../utils/icons"; 
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * @typedef {"single" | "multiple" | "range" | "time"} FlatpickrMode
 */

/**
 * @typedef {function | Array<function>} FlatpickrHook
 * // flatpickr's onChange can be a single function or an array of functions.
 * // Each function receives (selectedDates: Date[], dateStr: string, instance: flatpickr.Instance)
 */

/**
 * @typedef {string | Date | number | Array<string | Date | number>} FlatpickrDateOption
 * // flatpickr's defaultDate can be a string, Date object, timestamp, or an array of these.
 */

/**
 * DatePicker component wraps flatpickr to provide a customizable date input.
 *
 * @param {object} props - The props for the DatePicker component.
 * @param {string} props.id - The unique HTML ID for the input element.
 * @param {FlatpickrMode} [props.mode="single"] - The mode of the date picker (single, multiple, range, time).
 * @param {FlatpickrHook} [props.onChange] - Callback function(s) triggered when the date changes. Matches flatpickr's onChange signature.
 * @param {FlatpickrDateOption} [props.defaultDate] - The default selected date(s). Matches flatpickr's defaultDate option.
 * @param {string} [props.label] - The label text for the date picker.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 */
export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}) {
  useEffect(() => {
    // Initialize flatpickr on the input field
    const flatPickrInstance = flatpickr(`#${id}`, {
      mode: mode || "single", // Default to "single" mode if not provided
      static: true, // Keep the calendar static (not popping up and disappearing)
      monthSelectorType: "static", // Keep month selector always visible
      dateFormat: "Y-m-d", // Standard date format
      defaultDate, // Pass default date from props
      onChange, // Pass onChange handler from props
    });

    // Cleanup function: Destroys the flatpickr instance when the component unmounts
    // or when dependencies change and the effect re-runs.
    return () => {
      // flatpickr can return an array of instances in certain modes (e.g., if you initialize on multiple elements).
      // Here, since we target by ID, it's usually a single instance, but checking is safer.
      if (!Array.isArray(flatPickrInstance)) {
        flatPickrInstance.destroy();
      }
    };
    // Dependencies array: Re-run effect if mode, onChange handler, id, or defaultDate changes.
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          // The long className string is kept as is from your original code.
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}

// PropTypes for runtime type checking in development
DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  onChange: PropTypes.oneOfType([
    PropTypes.func, // A single function
    PropTypes.arrayOf(PropTypes.func), // Or an array of functions
  ]),
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.number])
    ),
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
};