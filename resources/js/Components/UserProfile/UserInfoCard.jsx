import { useModal } from "../../hooks/UseModal";
import { Modal } from "../UI/Modal";
import Button from "../UI/Button/Button";
import Input from "../Form/Input/InputField";
import Label from "../Form/Label";

/**
 * UserInfoCard functional component.
 * Displays the user's personal information (First Name, Last Name, Email, Phone, Bio).
 * Includes an "Edit" button that opens a modal for updating these details.
 * This component is self-contained with mock implementations of its dependencies for demonstration.
 */
export default function UserInfoCard() {
	// Destructuring the modal state and control functions from the useModal hook
	const { isOpen, openModal, closeModal } = useModal();

	/**
	 * handleSave function.
	 * This function is triggered when the "Save Changes" button inside the modal is clicked.
	 * It currently logs a message and closes the modal. In a real application,
	 * this would contain logic to send updated user data to a backend (e.g., API call).
	 */
	const handleSave = () => {
		// In a real app, you would collect form data (e.g., using useState for input values)
		// and send it to an API endpoint for persistence.
		console.log("Saving changes...");
		closeModal(); // Close the modal after saving
	};

	return (
		// Main card container for user personal information.
		// Applies Tailwind CSS classes for styling: padding, border, rounded corners,
		// background color, and dark mode variations.
		<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
			{/* Flex container for responsive layout of personal info display and the edit button.
          Arranges items in a column on small screens, and row on large screens. */}
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				{/* Section for displaying personal information */}
				<div>
					<h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
						Personal Information
					</h4>

					{/* Grid layout for displaying individual personal information fields.
              Single column on small screens, two columns on large screens. */}
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
						{/* First Name field */}
						<div>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								First Name
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								Musharof
							</p>
						</div>

						{/* Last Name field */}
						<div>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								Last Name
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								Chowdhury
							</p>
						</div>

						{/* Email address field */}
						<div>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								Email address
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								randomuser@pimjo.com
							</p>
						</div>

						{/* Phone field */}
						<div>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								Phone
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								+09 363 398 46
							</p>
						</div>

						{/* Bio field */}
						<div>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								Bio
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								Team Manager
							</p>
						</div>
					</div>
				</div>

				{/* Edit Profile button, triggers the modal to open */}
				<Button
					onClick={openModal}
					className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
					aria-label="Edit personal information" // Added for accessibility
				>
					{/* SVG icon for the edit button */}
					<svg
						className="fill-current"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
							fill="currentColor" // Use currentColor to inherit color from parent
						/>
					</svg>
					Edit
				</Button>
			</div>

			{/* Modal for editing personal information.
          Conditionally rendered based on `isOpen` state from `useModal` hook. */}
			<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
				{/* Modal content container with custom scrollbar and styling */}
				<div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
					{/* Modal header with title and description */}
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Edit Personal Information
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Update your details to keep your profile up-to-date.
						</p>
					</div>
					{/* Form for editing user data */}
					<form className="flex flex-col">
						{/* Scrollable area for form fields */}
						<div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
							{/* Social Links section (replicated from UserMetaCard for a complete form) */}
							<div>
								<h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
									Social Links
								</h5>

								<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
									<div>
										<Label htmlFor="facebook">Facebook</Label>
										<Input
											id="facebook"
											type="text"
											value="https://www.facebook.com/PimjoHQ"
										// onChange={(e) => setFacebookUrl(e.target.value)} // In a real app, manage state here
										/>
									</div>

									<div>
										<Label htmlFor="xcom">X.com</Label>
										<Input id="xcom" type="text" value="https://x.com/PimjoHQ" />
									</div>

									<div>
										<Label htmlFor="linkedin">Linkedin</Label>
										<Input
											id="linkedin"
											type="text"
											value="https://www.linkedin.com/company/pimjo"
										/>
									</div>

									<div>
										<Label htmlFor="instagram">Instagram</Label>
										<Input id="instagram" type="text" value="https://instagram.com/PimjoHQ" />
									</div>
								</div>
							</div>
							{/* Personal Information section (core of this modal) */}
							<div className="mt-7">
								<h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
									Personal Information
								</h5>

								<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
									<div className="col-span-2 lg:col-span-1">
										<Label htmlFor="firstName">First Name</Label>
										<Input id="firstName" type="text" value="Musharof" />
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label htmlFor="lastName">Last Name</Label>
										<Input id="lastName" type="text" value="Chowdhury" />
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label htmlFor="email">Email Address</Label>
										<Input id="email" type="text" value="randomuser@pimjo.com" />
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label htmlFor="phone">Phone</Label>
										<Input id="phone" type="text" value="+09 363 398 46" />
									</div>

									<div className="col-span-2">
										<Label htmlFor="bio">Bio</Label>
										<Input id="bio" type="text" value="Team Manager" />
									</div>
								</div>
							</div>
						</div>
						{/* Modal action buttons */}
						<div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
							<Button size="sm" variant="outline" onClick={closeModal}>
								Close
							</Button>
							<Button size="sm" onClick={handleSave}>
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
}
