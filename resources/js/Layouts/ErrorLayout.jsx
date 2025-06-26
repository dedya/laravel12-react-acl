// ErrorLayout.jsx
import React from "react";
import GridShape from "../Components/Common/GridShape";
import { Link } from "@inertiajs/react";

/**
 * AuthLayout component provides a common layout for authentication pages.
 * It includes a main content area for children and a decorative sidebar.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be rendered within the main layout area.
 */
export default function ErrorLayout({ children }) {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
			<GridShape />
			<div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
				{children}
			</div>

			 {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - TailAdmin
        </p>
				
		</div>
	);
};