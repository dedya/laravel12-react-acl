import Label from "@/Components/Form/Label";
import FileInput from "@/Components/Form/Input/FileInput";

const FileGroup = ({ label, required = true,onChange }) => {

  return (
    <>
      <Label htmlFor="app_logo">
        {label}
        {required && (<span className="text-red-500 ml-1">*</span>)}
      </Label>

      <FileInput
        accept="image/*"
        onChange={onChange}
      />

      
    </>
  );
}

export default FileGroup;