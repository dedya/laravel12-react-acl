import { useState } from 'react';

export default function Autocomplete({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
}) {
  const [query, setQuery] = useState(value);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setQuery(options.find(opt => opt.value === val)?.label || '');
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {query && filtered.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 rounded w-full mt-1 max-h-40 overflow-auto z-10">
          {filtered.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleSelect(opt.value)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
