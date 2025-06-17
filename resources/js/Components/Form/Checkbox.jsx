export default function Checkbox({
  label,
  name,
  checked = false,
  onChange,
  error,
  required = false,
  disabled = false,
}) {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
        />
        <span>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
