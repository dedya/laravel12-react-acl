import Label from "@/Components/Form/Label";
import Select from "@/Components/Form/Select";

const SelectGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  hint,
  required = true,
}) => {
  return (
    <div className="col-span-2 lg:col-span-1">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        id={name}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        error={hint != undefined ? true : false}
        hint={hint}
        required = {required}
      />
    </div>
  );
}

export default SelectGroup;

