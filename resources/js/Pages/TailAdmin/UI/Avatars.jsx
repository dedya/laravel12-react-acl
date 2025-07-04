import PageBreadcrumb from "../../../Components/Common/PageBreadCrumb";
import ComponentCard from "../../../Components/Common/ComponentCard";
import Avatar from "../../../Components/UI/Avatar/Avatar";
import PageMeta from "../../../Components/Common/PageMeta";

export default function Avatars() {
	return (
		<>
			<PageMeta
				title="React.js Avatars Dashboard | TailAdmin - React.js Admin Dashboard Template"
				description="This is React.js Avatars Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Avatars" />
			<div className="space-y-5 sm:space-y-6">
				<ComponentCard title="Default Avatar">
					{/* Default Avatar (No Status) */}
					<div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
						<Avatar src="/assets/images/user/user-01.jpg" size="xsmall" />
						<Avatar src="/assets/images/user/user-01.jpg" size="small" />
						<Avatar src="/assets/images/user/user-01.jpg" size="medium" />
						<Avatar src="/assets/images/user/user-01.jpg" size="large" />
						<Avatar src="/assets/images/user/user-01.jpg" size="xlarge" />
						<Avatar src="/assets/images/user/user-01.jpg" size="xxlarge" />
					</div>
				</ComponentCard>
				<ComponentCard title="Avatar with online indicator">
					<div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xsmall"
							status="online"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="small"
							status="online"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="medium"
							status="online"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="large"
							status="online"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xlarge"
							status="online"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xxlarge"
							status="online"
						/>
					</div>
				</ComponentCard>
				<ComponentCard title="Avatar with Offline indicator">
					<div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xsmall"
							status="offline"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="small"
							status="offline"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="medium"
							status="offline"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="large"
							status="offline"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xlarge"
							status="offline"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xxlarge"
							status="offline"
						/>
					</div>
				</ComponentCard>{" "}
				<ComponentCard title="Avatar with busy indicator">
					<div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xsmall"
							status="busy"
						/>
						<Avatar src="/assets/images/user/user-01.jpg" size="small" status="busy" />
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="medium"
							status="busy"
						/>
						<Avatar src="/assets/images/user/user-01.jpg" size="large" status="busy" />
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xlarge"
							status="busy"
						/>
						<Avatar
							src="/assets/images/user/user-01.jpg"
							size="xxlarge"
							status="busy"
						/>
					</div>
				</ComponentCard>
			</div>
		</>
	);
}
