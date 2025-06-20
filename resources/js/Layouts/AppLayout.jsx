import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { SidebarProvider, useSidebar } from "../utils/context/SidebarContext";
import { Outlet } from "react-router";

const LayoutContent = ({children}) => {
	//console.log('children',children);
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();

	return (
		<div className="min-h-screen xl:flex">
			<div>
				<AppSidebar />
				<Backdrop />
			</div>

			<div className={`flex-1 transition-all duration-300 ease-in-out 
				${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
				} 
				${isMobileOpen ? "ml-0" : ""
				}
			`}>

				<AppHeader />

				{/* <!-- Outlet  */}
				<div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
					{children} {/* This children is from AppLayout */}
				</div>
				{/* Outlet  --> */}

			</div>

		</div>
	);
};

const AppLayout = ({ children }) => {
	return (
		<SidebarProvider>
			<LayoutContent>
				{children} 
			</LayoutContent>
		</SidebarProvider>
	);
};

export default AppLayout;