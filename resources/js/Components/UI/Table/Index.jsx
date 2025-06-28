import React from "react"; 
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * Table Component
 * Renders an HTML <table> element.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The table content (e.g., TableHeader, TableBody).
 * @param {string} [props.className] - Optional CSS classes for the table element.
 */
const Table = ({ children, className }) => {
  return <table className={`min-w-full ${className || ''}`}>{children}</table>;
};

// PropTypes for Table
Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


/**
 * TableHeader Component
 * Renders an HTML <thead> element.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The header row(s) (e.g., TableRow).
 * @param {string} [props.className] - Optional CSS classes for the thead element.
 */
const TableHeader = ({ children, className }) => {
  return <thead className={className || ''}>{children}</thead>;
};

// PropTypes for TableHeader
TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


/**
 * TableBody Component
 * Renders an HTML <tbody> element.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The body row(s) (e.g., TableRow).
 * @param {string} [props.className] - Optional CSS classes for the tbody element.
 */
const TableBody = ({ children, className }) => {
  return <tbody className={className || ''}>{children}</tbody>;
};

// PropTypes for TableBody
TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


/**
 * TableRow Component
 * Renders an HTML <tr> element.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The cells (th or td) (e.g., TableCell).
 * @param {string} [props.className] - Optional CSS classes for the tr element.
 */
const TableRow = ({ children, className }) => {
  return <tr className={className || ''}>{children}</tr>;
};

// PropTypes for TableRow
TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


/**
 * TableCell Component
 * Renders an HTML <th> or <td> element based on `isHeader` prop.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The cell content.
 * @param {boolean} [props.isHeader=false] - If true, renders as <th>; otherwise, renders as <td>.
 * @param {string} [props.className] - Optional CSS classes for the cell element.
 */
const TableCell = ({
  children,
  isHeader = false, // JavaScript default parameter
  className,
  colspan = ""
}) => {
  const CellTag = isHeader ? "th" : "td";
  // The extra space at the beginning of className in your original code is fine
  // but can be cleaner by just ensuring an empty string if className is undefined.
  return <CellTag colSpan={colspan}  className={`${className || ''}`}>{children}</CellTag>;
};

// PropTypes for TableCell
TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool,
  className: PropTypes.string,
};

// No need for defaultProps if using default parameters in destructuring
// TableCell.defaultProps = {
//   isHeader: false,
// };


export { Table, TableHeader, TableBody, TableRow, TableCell };