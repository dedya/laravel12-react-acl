export default function TextInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    placeholder,
    disabled = false,
    autoComplete = 'off',
    inputRef = null
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                ref={inputRef}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}