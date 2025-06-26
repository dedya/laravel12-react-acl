import React from 'react'; // Import React for component creation

/**
 * Avatar functional component.
 * Displays a user avatar with customizable size and an optional status indicator.
 *
 * Props:
 * - src: string - URL of the avatar image.
 * - alt: string (optional, default: "User Avatar") - Alt text for the avatar image, important for accessibility.
 * - size: string ('xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', default: 'medium') -
 * Controls the predefined size of the avatar (height and width).
 * - status: string ('online', 'offline', 'busy', 'none', default: 'none') -
 * Displays a colored dot indicating the user's status. 'none' means no status dot.
 */
const Avatar = ({
	src,
	alt = "User Avatar",
	size = "medium",
	status = "none",
}) => {
	// Define Tailwind CSS classes for different avatar sizes.
	// These control the height, width, and max-width of the avatar container.
	const sizeClasses = {
		xsmall: "h-6 w-6 max-w-6",
		small: "h-8 w-8 max-w-8",
		medium: "h-10 w-10 max-w-10",
		large: "h-12 w-12 max-w-12",
		xlarge: "h-14 w-14 max-w-14",
		xxlarge: "h-16 w-16 max-w-16",
	};

	// Define Tailwind CSS classes for the size of the status indicator dot, based on avatar size.
	const statusSizeClasses = {
		xsmall: "h-1.5 w-1.5 max-w-1.5",
		small: "h-2 w-2 max-w-2",
		medium: "h-2.5 w-2.5 max-w-2.5",
		large: "h-3 w-3 max-w-3",
		xlarge: "h-3.5 w-3.5 max-w-3.5",
		xxlarge: "h-4 w-4 max-w-4",
	};

	// Define Tailwind CSS classes for the color of the status indicator dot.
	const statusColorClasses = {
		online: "bg-green-500", // Using a common Tailwind green for success/online
		offline: "bg-red-400",  // Using a common Tailwind red for error/offline
		busy: "bg-yellow-500",  // Using a common Tailwind yellow for warning/busy
		none: "", // No color class if status is 'none'
	};

	return (
		// Main container for the avatar. Applies relative positioning for the status dot.
		<div className={`relative rounded-full ${sizeClasses[size]}`}>
			{/* Avatar Image.
          `object-cover` ensures the image fills the container without distortion.
          `rounded-full` makes the image circular. */}
			<img
				src={src}
				alt={alt}
				className="object-cover rounded-full h-full w-full" // Added h-full w-full for image to fill its parent div
				onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/${sizeClasses[size].split(' ')[0].split('-')[1]}x${sizeClasses[size].split(' ')[1].split('-')[1]}/cccccc/333333?text=N/A`; }} // Fallback image on error
			/>

			{/* Status Indicator.
          Conditionally rendered only if `status` is not 'none'.
          Positioned absolutely at the bottom right.
          Includes a white border for contrast against the avatar. */}
			{status !== "none" && (
				<span
					className={`absolute bottom-0 right-0 rounded-full border-[1.5px] border-white dark:border-gray-900 ${statusSizeClasses[size]
						} ${statusColorClasses[status]}`}
					aria-label={`${status} status`} // Added for accessibility
				></span>
			)}
		</div>
	);
};

export default Avatar;
