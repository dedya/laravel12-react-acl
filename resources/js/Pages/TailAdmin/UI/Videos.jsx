import ComponentCard from "../../../Components/Common/ComponentCard";
import PageBreadcrumb from "../../../Components/Common/PageBreadCrumb";
import PageMeta from "../../../Components/Common/PageMeta";
import FourIsToThree from "../../../Components/UI/Videos/FourIsToThree";
import OneIsToOne from "../../../Components/UI/Videos/OneIsToOne";
import SixteenIsToNine from "../../../Components/UI/Videos/SixteenIsToNine";
import TwentyOneIsToNine from "../../../Components/UI/Videos/TwentyOneIsToNine";

export default function Videos() {
	return (
		<>
			<PageMeta
				title="React.js Videos Tabs | TailAdmin - React.js Admin Dashboard Template"
				description="This is React.js Videos page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Videos" />
			<div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
				<div className="space-y-5 sm:space-y-6">
					<ComponentCard title="Video Ratio 16:9">
						<SixteenIsToNine />
					</ComponentCard>
					<ComponentCard title="Video Ratio 4:3">
						<FourIsToThree />
					</ComponentCard>
				</div>
				<div className="space-y-5 sm:space-y-6">
					<ComponentCard title="Video Ratio 21:9">
						<TwentyOneIsToNine />
					</ComponentCard>
					<ComponentCard title="Video Ratio 1:1">
						<OneIsToOne />
					</ComponentCard>
				</div>
			</div>
		</>
	);
}
