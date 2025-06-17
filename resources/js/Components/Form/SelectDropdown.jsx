export default function SelectDropdown({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
}) {
    return (
        <div className="mb-4">
        {label && (
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 ${
            error ? 'border-red-500' : 'border-gray-300'
            }`}
        >
            <option value=""></option>
            {options.map((opt, index) => (
            <option key={index} value={opt.value}>
                {opt.label}
            </option>
            ))}
        </select>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}
