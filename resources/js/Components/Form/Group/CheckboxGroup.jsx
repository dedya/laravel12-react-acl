import Checkbox from "@/Components/Form/Input/Checkbox";


const CheckboxGroup = ({
  name,
  label,
  checked =false,
  onChange,
}) => {
  return (
    <div className="col-span-2 lg:col-span-1 mt-5">
      
      <Checkbox
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        label={label}
      />
    </div>
  );
};


export default CheckboxGroup;
