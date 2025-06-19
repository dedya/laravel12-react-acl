// ComponentCard.jsx
import React from "react"; 
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * ComponentCard component wraps content in a styled card with a title and optional description.
 *
 * @param {object} props - The props for the ComponentCard.
 * @param {string} props.title - The title to display in the card header.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card body.
 * @param {string} [props.className=""] - Additional custom CSS classes for the card container.
 * @param {string} [props.desc=""] - Optional description text to display below the title.
 */
const ComponentCard = ({
	title,
	children,
	className = "", // JavaScript default parameter
	desc = "",      // JavaScript default parameter
}) => {
	return (
		<div
			className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
		>
			{/* Card Header */}
			<div className="px-6 py-5">
				<h3 className="text-base font-medium text-gray-800 dark:text-white/90">
					{title}
				</h3>
				{desc && (
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						{desc}
					</p>
				)}
			</div>

			{/* Card Body */}
			<div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
				{/* Note: The 'space-y-6' div here might be intended for children
           that are also spaced vertically. If `children` should directly
           receive the styling of the parent div, you might consider removing this inner div.
           For now, it's kept as per your original structure.
        */}
				<div className="space-y-6">{children}</div>
			</div>
		</div>
	);
};

// PropTypes for runtime type checking in development
ComponentCard.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired, // Children are required and can be any renderable React node
	className: PropTypes.string,
	desc: PropTypes.string,
};

// No need for ComponentCard.defaultProps if using default parameters in destructuring

export default ComponentCard;