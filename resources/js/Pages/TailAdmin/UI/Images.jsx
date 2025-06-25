import PageBreadcrumb from "../../../Components/Common/PageBreadCrumb";
import ResponsiveImage from "../../../Components/UI/Images/ResponsiveImage";
import TwoColumnImageGrid from "../../../Components/UI/Images/TwoColumnImageGrid";
import ThreeColumnImageGrid from "../../../Components/UI/Images/ThreeColumnImageGrid";
import ComponentCard from "../../../Components/Common/ComponentCard";
import PageMeta from "../../../Components/Common/PageMeta";

export default function Images() {
  return (
    <>
      <PageMeta
        title="React.js Images Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Images page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </>
  );
}
