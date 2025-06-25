import PageBreadcrumb from "../../Components/Common/PageBreadCrumb";
import DefaultInputs from "../../Components/Form/Form-elements/DefaultInputs";
import InputGroup from "../../Components/Form/Form-elements/InputGroup";
import DropzoneComponent from "../../Components/Form/Form-elements/DropZone";
import CheckboxComponents from "../../Components/Form/Form-elements/CheckboxComponents";
import RadioButtons from "../../Components/Form/Form-elements/RadioButtons";
import ToggleSwitch from "../../Components/Form/Form-elements/ToggleSwitch";
import FileInputExample from "../../Components/Form/Form-elements/FileInputExample";
import SelectInputs from "../../Components/Form/Form-elements/SelectInputs";
import TextAreaInput from "../../Components/Form/Form-elements/TextAreaInput";
import InputStates from "../../Components/Form/Form-elements/InputStates";
import PageMeta from "../../Components/Common/PageMeta";

export default function FormElements() {
	return (
		<div>
			<PageMeta
				title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
				description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="From Elements" />
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<div className="space-y-6">
					<DefaultInputs />
					<SelectInputs />
					<TextAreaInput />
					<InputStates />
				</div>
				<div className="space-y-6">
					<InputGroup />
					<FileInputExample />
					<CheckboxComponents />
					<RadioButtons />
					<ToggleSwitch />
					<DropzoneComponent />
				</div>
			</div>
		</div>
	);
}
