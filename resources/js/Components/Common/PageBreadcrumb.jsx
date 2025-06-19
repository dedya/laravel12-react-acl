// PageBreadcrumb.jsx
import React from "react"; // Explicitly import React for JSX
// Use Link from @inertiajs/react for Inertia applications
import { Link } from "@inertiajs/react"; // IMPORTANT: Changed from "react-router"
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * PageBreadcrumb component displays a page title and a basic breadcrumb navigation.
 *
 * @param {object} props - The props for the PageBreadcrumb component.
 * @param {string} props.pageTitle - The title of the current page, displayed as the main heading and the last breadcrumb item.
 */
const PageBreadcrumb = ({ pageTitle }) => {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3 mb-6">
			<h2
				className="text-xl font-semibold text-gray-800 dark:text-white/90"
			// x-text="pageName" is Alpine.js syntax and will not work in React/JSX
			// If you intended dynamic text from a non-React source, remove or adapt.
			>
				{pageTitle}
			</h2>
			<nav>
				<ol className="flex items-center gap-1.5">
					<li>
						<Link
							className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
							href={route('tailadmin.dashboard')} // IMPORTANT: In Inertia's Link, use `href` instead of `to`
						>
							Home
							<svg
								className="stroke-current"
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
									stroke=""
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</li>
					<li className="text-sm text-gray-800 dark:text-white/90">
						{pageTitle}
					</li>
				</ol>
			</nav>
		</div>
	);
};

// PropTypes for runtime type checking in development
PageBreadcrumb.propTypes = {
	pageTitle: PropTypes.string.isRequired, // pageTitle is a required string
};

export default PageBreadcrumb;