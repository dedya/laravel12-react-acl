export default function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) {
    return (
        <div className="mb-4">
        {label && (
            <p className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            </p>
        )}
        <div className="space-y-2">
            {options.map((opt, index) => (
            <label key={index} className="inline-flex items-center space-x-2">
                <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                disabled={disabled}
                className="text-blue-500 focus:ring-blue-200"
                />
                <span>{opt.label}</span>
            </label>
            ))}
        </div>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}
