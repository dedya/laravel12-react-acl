export default function DependentDropdown({
  label,
  name,
  value,
  onChange,
  parentValue,
  getOptions,
  error,
  required = false,
}) {
  const options = getOptions(parentValue) || [];

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
        required={required}
        className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">-- Select --</option>
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
