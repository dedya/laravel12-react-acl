// ThemeContext.jsx
"use client"; // Keep this directive if this is for Next.js App Router

import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes for validating children if needed

/**
 * @typedef {"light" | "dark"} Theme
 */

/**
 * @typedef {object} ThemeContextType
 * @property {Theme} theme - The current theme ('light' or 'dark').
 * @property {function(): void} toggleTheme - Function to toggle the theme.
 */

// Create the context. In JS, we don't provide a type, just an initial value.
// It's common to set it to an object with the same shape as your context value,
// or null/undefined and then check for it in the hook.
const ThemeContext = createContext(undefined);

/**
 * Provides the theme context to its children.
 * @param {object} props
 * @param {React.ReactNode} props.children - The child elements to be wrapped by the provider.
 */
export const ThemeProvider = ({ children }) => {
	/** @type {[Theme, React.Dispatch<React.SetStateAction<Theme>>]} */
	const [theme, setTheme] = useState("light");
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// This code will only run on the client side
		// No 'as Theme | null' needed in JS
		const savedTheme = localStorage.getItem("theme");
		// Explicitly check for 'dark' as a valid theme, otherwise default to 'light'
		const initialTheme = savedTheme === "dark" ? "dark" : "light";

		setTheme(initialTheme);
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem("theme", theme);
			if (theme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}, [theme, isInitialized]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	// The value provided by the context provider
	const contextValue = { theme, toggleTheme };

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

// PropTypes for ThemeProvider (optional but good practice)
ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};


/**
 * Custom hook to consume the theme context.
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};