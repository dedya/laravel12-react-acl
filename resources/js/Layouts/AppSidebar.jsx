import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from 'react';
import {
	BoxCubeIcon,
	CalenderIcon,
	ChevronDownIcon,
	GridIcon,
	HorizontaLDots,
	ListIcon,
	PageIcon,
	PieChartIcon,
	PlugInIcon,
	TableIcon,
	UserCircleIcon,
} from './../utils/icons';
import { useSidebar } from "../utils/context/SidebarContext";

function AppSidebar() {
	const { general } = usePage().props;
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

	const navItems = [
		{
			icon: <GridIcon />,
			name: "Dashboard",
			subItems: [{ name: "Ecommerce", path: route('tailadmin.dashboard'), pro: false }],
		},
		{
			icon: <CalenderIcon />,
			name: "Calendar",
			path: route('tailadmin.calendar'),
		},
		{
			icon: <UserCircleIcon />,
			name: "User Profile",
			path: route('tailadmin.profile'),
		},
		{
			name: "Forms",
			icon: <ListIcon />,
			subItems: [{ name: "Form Elements", path: route('tailadmin.form'), pro: false }],
		},
		{
			name: "Tables",
			icon: <TableIcon />,
			subItems: [{ name: "Basic Tables", path: route('tailadmin.table'), pro: false }],
		},
		{
			name: "Pages",
			icon: <PageIcon />,
			subItems: [
				{ name: "Blank Page", path: route('tailadmin.blank'), pro: false },
				{ name: "404 Error", path: route('tailadmin.404'), pro: false },
			],
		},
	];

	const othersItems = [
		{
			icon: <PieChartIcon />,
			name: "Charts",
			subItems: [
				{ name: "Line Chart", path: route('tailadmin.chart.line'), pro: false },
				{ name: "Bar Chart", path: route('tailadmin.chart.bar'), pro: false },
			],
		},
		{
			icon: <BoxCubeIcon />,
			name: "UI Elements",
			subItems: [
				{ name: "Alerts", path: route('tailadmin.ui.alert'), pro: false },
				{ name: "Avatar", path: route('tailadmin.ui.avatars'), pro: false },
				{ name: "Badge", path: route('tailadmin.ui.badge'), pro: false },
				{ name: "Buttons", path: route('tailadmin.ui.buttons'), pro: false },
				{ name: "Images", path: route('tailadmin.ui.images'), pro: false },
				{ name: "Videos", path: route('tailadmin.ui.videos'), pro: false },
			],
		},
		{
			icon: <PlugInIcon />,
			name: "Authentication",
			subItems: [
				{ name: "Sign In", path: route('tailadmin.signin'), pro: false },
				{ name: "Sign Up", path: route('tailadmin.signup'), pro: false },
			],
		},
	];

	const subMenuRefs = useRef({});

	const [openSubmenu, setOpenSubmenu] = useState({ menuType: 'main', index: -1 });


	useEffect(() => {
		console.log('use effect');
		if (openSubmenu !== null) {
			const key = `${openSubmenu.type}-${openSubmenu.index}`;
			console.log('subMenuRefs', subMenuRefs);
			console.log('use effect key', key);
			if (subMenuRefs.current[key]) {
				console.log('subMenuRefs effect key', key);
				setSubMenuHeight((prevHeights) => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0,
				}));
			}
		}
	}, [openSubmenu]);

	const handleSubmitToggle = (index, menuType) => {
		console.log('openSubmenu:', openSubmenu);
		console.log('subMenuHeight:', subMenuHeight);

		setOpenSubmenu((prevOpenSubmenu) => {

			console.log('menuType:', menuType);
			console.log('index:', index);
			console.log('prevOpenSubmenu:', prevOpenSubmenu);

			if (prevOpenSubmenu && prevOpenSubmenu.index == index && prevOpenSubmenu.type == menuType) {
				console.log('sm prevOpenSubmenu:', prevOpenSubmenu);
				return { type: menuType, index: -1 };
			}

			return { type: menuType, index };
		});
	};

	const [subMenuHeight, setSubMenuHeight] = useState({});

	const renderMenuItems = (items, menuType) => (
		<ul className="flex flex-col gap-4 mb-6">
			{items.map((nav, index) => (

				<li key={nav.name}>
					{
						nav.subItems ?
							(
								<button
									className={`menu-item group menu-item-inactive lg:justify-start`}
									onClick={() => handleSubmitToggle(index, menuType)}
								>
									<span className={`menu-item-icon-size menu-item-icon-inactive`}>
										{nav.icon}
									</span>

									<span className="menu-item-text">{nav.name} </span>

									<ChevronDownIcon
										className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu.index == index ? "rotate-180 text-brand-500" : ""} `}
									/>

								</button>
							) :
							(nav.path && (
								<Link
									href={nav.path}
									className={`menu-item group menu-item-inactive`}>
									<span className={`menu-item-icon-size menu-item-icon-inactive}`}>
										{nav.icon}
									</span>

									<span className="menu-item-text">{nav.name}</span>
								</Link>)
							)
					}
					{
						nav.subItems && (
							<div className="overflow-hidden transition-all duration-300"
								ref={(el) => {
									subMenuRefs.current[`${menuType}-${index}`] = el;
								}}
								style={{
									height:
										openSubmenu.index == index
											? `${subMenuHeight[`${menuType}-${index}`]}px`
											: "0px",
								}}
							>

								<ul className="mt-2 space-y-1 ml-9">
									{
										nav.subItems.map((subItem) => (
											<li key={subItem.name}>
												<Link
													href={subItem.path}
													className="menu-dropdown-item menu-dropdown-item-inactive"

												>
													{subItem.name}
												</Link>
											</li>
										))
									}
								</ul>

							</div>
						)
					}
				</li>
			))}
		</ul>
	);

	return (
		<aside 
			className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
				${
					isExpanded || isMobileOpen
					? "w-[290px]"
					: isHovered
					? "w-[290px]"
					: "w-[90px]"
				}
				${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
				lg:translate-x-0
			`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
			>
			{/* start of SIDEBAR HEADER  */}
			<div className="flex items-center gap-2 pt-8 sidebar-header pb-7">
				<Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/assets/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/assets/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/assets/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
			</div>{/* end of SIDEBAR HEADER  */}

			<div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
				{/* start of Sidebar Menu  */}
				<nav className="mb-6">
					{/* start of Menu Group */}
					<div>
						<h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
							<span className="menu-group-title">
								{isExpanded || isHovered || isMobileOpen ? (
									general?.menu || 'Menu'
								) : (
                  <HorizontaLDots className="size-6" />
                )}
								
							</span>
						</h2>

						{/* start of render of menu */}
						{renderMenuItems(navItems, "main")}
						{/* end of render of menu */}

					</div>
					{/* start of Menu Group  */}

					{/* start of other Menu Group  */}
					<div className="">
						<h2
							className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
									? "lg:justify-center"
									: "justify-start"
								}`}
						>
							{isExpanded || isHovered || isMobileOpen ? (
								"Others"
							) : (
								<HorizontaLDots />
							)}
						</h2>
						{renderMenuItems(othersItems, "others")}
					</div>
					{/* end of other Menu Group  */}
				</nav>
				{/* end of Sidebar Menu  */}
				
			</div>
		</aside>
	);
}

export default AppSidebar;