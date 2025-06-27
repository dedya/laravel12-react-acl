import EcommerceMetrics from "../../Components/Ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../Components/Ecommerce/MonthlySalesChart";
import StatisticsChart from "../../Components/Ecommerce/StatisticsChart";
import MonthlyTarget from "../../Components/Ecommerce/MonthlyTarget";
import RecentOrders from "../../Components/Ecommerce/RecentOrders";
import PageMeta from "../../Components/Common/PageMeta";

export default function Home() {
	return (
		<>
			<PageMeta
				title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
				description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12 space-y-6 xl:col-span-7">
					<EcommerceMetrics />

					<MonthlySalesChart />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<MonthlyTarget />
				</div>

				<div className="col-span-12">
					<StatisticsChart />
				</div>

				<div className="col-span-12 xl:col-span-7">
					<RecentOrders />
				</div>
			</div>
		</>
	);
}
