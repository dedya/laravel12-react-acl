// AuthLayout.jsx
import React from "react"; 
import GridShape from "../Components/Common/GridShape";
import { Link } from "@inertiajs/react";
import ThemeTogglerTwo from "../Components/Common/ThemeTogglerTwo";
import PropTypes from 'prop-types'; 

/**
 * AuthLayout component provides a common layout for authentication pages.
 * It includes a main content area for children and a decorative sidebar.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be rendered within the main layout area.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children} 
        Tapi tidak perduli
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
              Logo
                <img
                  width={231}
                  height={48}
                  src="/assets/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}

// PropTypes for AuthLayout
/*
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and can be any renderable React node
};*/