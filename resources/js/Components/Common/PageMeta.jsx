import React from "react"; 
import { HelmetProvider, Helmet } from "react-helmet-async";
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * PageMeta component to manage HTML head elements.
 * @param {object} props - The props object.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description meta tag for the page.
 */
const PageMeta = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

// PropTypes for PageMeta
PageMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/**
 * AppWrapper component to provide HelmetProvider context.
 * This should wrap your entire application where Helmet components are used.
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 */
export const AppWrapper = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

// PropTypes for AppWrapper
/*
AppWrapper.propTypes = {
  // PropTypes.node covers anything that React can render:
  // elements, strings, numbers, fragments, portals, null, booleans, and arrays containing these types.
  children: PropTypes.node.isRequired,
};
*/


export default PageMeta;