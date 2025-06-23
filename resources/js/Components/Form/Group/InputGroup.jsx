import Label from "@/Components/Form/Label";
import Input from "@/Components/Form/Input/InputField";

const InputGroup = ({
  label,
  name,
  type="text",
  value,
  required = true,
  onChange,
  className = "",
  placeholder = "",
  disabled = false,
  autoComplete = 'off',
  inputRef = null,
  hint,
}) => {
  return (
    <div className="col-span-2 lg:col-span-1">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={hint != undefined ? true : false}
        disabled={disabled}
        autoComplete={autoComplete}
        hint={hint}
        className={className}
      />
    </div>
  );
}

export default InputGroup;

