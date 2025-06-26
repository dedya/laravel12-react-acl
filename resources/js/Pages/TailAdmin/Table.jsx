// BasicTables.jsx
import React from "react"; // Explicitly import React for JSX
import PageBreadcrumb from "../../Components/Common/PageBreadCrumb"; // Assuming PageBreadCrumb.jsx
import ComponentCard from "../../Components/Common/ComponentCard"; // Assuming ComponentCard.jsx
import PageMeta from "../../Components/Common/PageMeta"; // Assuming PageMeta.jsx
import BasicTableOne from "../../Components/Tables/BasicTables/BasicTableOne"; // Assuming BasicTableOne.jsx

/**
 * BasicTables component demonstrates the usage of various basic table components.
 * It includes a page title, breadcrumb, and a card displaying a basic table.
 */
export default function BasicTables() {
	return (
		<>
			<PageMeta
				title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Basic Tables" />
			<div className="space-y-6">
				<ComponentCard title="Basic Table 1">
					<BasicTableOne />
				</ComponentCard>
			</div>
		</>
	);
}