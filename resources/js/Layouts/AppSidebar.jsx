import { Link, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
//import { useLocation } from "react-router";
// Assume these icons are imported from an icon library
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
import SidebarWidget from "./SidebarWidget";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { can } from '@/utils/can';


const othersItems = [
	{
		icon: <PieChartIcon />,
		name: "Charts",
    visible: false,
		subItems: [
			{ name: "Line Chart", path: route('tailadmin.chart.line'), pro: false },
			{ name: "Bar Chart", path: route('tailadmin.chart.bar'), pro: false },
		],
	},
	{
		icon: <BoxCubeIcon />,
		name: "UI Elements",
    visible: false,
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
function AppSidebar() {
	const { general } = usePage().props;
  	const { t, tChoice, currentLocale, setLocale, getLocales, isLocale  } = useLaravelReactI18n();
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
	//const location = useLocation();
	const page = usePage();
	const [openSubmenu, setOpenSubmenu] = useState({
		type: 'main',
		index: -1
	});

	const [subMenuHeight, setSubMenuHeight] = useState({

	});
	const subMenuRefs = useRef({});

	// const isActive = (path: string) => location.pathname === path;
	const isActive = useCallback(
    (path) => {
      // Ensure path is always treated as an absolute URL for URL object creation
      const normalizePath = (p) => {
        return p === '/' ? '/' : p.replace(/\/+$/, '');
      };

      // Ensure path is always treated as an absolute URL for URL object creation
      const absolutePath = path.startsWith('/') ? path : `${path}`;
      
      const currentPageUrl = new URL(page.url, window.location.origin);
      const itemUrl = new URL(absolutePath, window.location.origin);

      const currentPathname = normalizePath(currentPageUrl.pathname);
      const itemPathname = normalizePath(itemUrl.pathname);

			//console.log('--- isActive Debug ---');
			//console.log('current url:', page.url);
      //console.log('Input path:', path);
    	//console.log('item url:', itemPathname);
      //console.log('page.url (raw):', page.url);
      //console.log('window.location.origin:', window.location.origin);
      //console.log('currentPageUrl.pathname (raw):', currentPageUrl.pathname);
      //console.log('itemUrl:', itemUrl.pathname.toString());
      //console.log('currentPathname (normalized):', currentPathname);
      //console.log('itemPathname (normalized):', itemPathname);

			let result;
			// Special handling for the root path ('/') to ensure it's only active when exactly on root.
      if (itemPathname === '/') {
        result = currentPathname === '/';
        //console.log('Root path item. Result:', result);
        //console.log('--- End isActive Debug ---');
        return result;
      }

			// For all other paths, check for exact match
      // OR check if current path starts with item path and is followed by a segment boundary (e.g., /forms/ elements, not /forms-data)
      const exactMatch = currentPathname === itemPathname;
      // This ensures that /forms matches /forms/elements but not /forms-data
      const startsWithSegment = currentPathname.startsWith(`${itemPathname}/`);

			result = (page.url == itemPathname);
			//result = "http://localhost:8000/tailadmin/calendar" == "http://localhost:8000/tailadmin/calendar";
			//console.log('result:',result);
      //result = exactMatch || startsWithSegment;

      //console.log('Exact match:', exactMatch);
      //console.log('Starts with segment:', startsWithSegment);
      //console.log('Final result:', result);
      //console.log('--- End isActive Debug ---');
      return result;
      // Check for exact match of the pathname
      // Or check if the current pathname starts with the item's pathname followed by a slash,
      // which indicates a child route (e.g., /forms/elements matches /forms)
      // This is a common pattern for parent menu items to be active if any sub-item is active.
      //return currentPathname === itemPathname || currentPathname.startsWith(`${itemPathname}/`);
    },
    [page.url] // Dependency array: Recalculate `isActive` only when `page.url` changes.
  );

	useEffect(() => {
		let submenuMatched = false;
    // Iterate through main navigation items
    navItems.forEach((nav, index) => {
      if (nav.subItems) { // Check if the current nav item has sub-items (i.e., it's a submenu parent)
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) { // If any sub-item's path is active
            setOpenSubmenu({
              type: "main", // Corrected: use string literal 'main'
              index, // Set the index of the parent submenu
            });
            submenuMatched = true; // Mark that a submenu was matched
            //console.log(`Matched main submenu: ${nav.name} at index ${index} for path ${subItem.path}`);
          }
        });
      }
    });

		// Iterate through "others" navigation items
    if (!submenuMatched) { // Only check others if no main submenu was matched
      othersItems.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: "others", // Corrected: use string literal 'others'
                index,
              });
              submenuMatched = true;
              //console.log(`Matched others submenu: ${nav.name} at index ${index} for path ${subItem.path}`);
            }
          });
        }
      });
    } 

		//console.log('page:', page);
		//console.log('isActive:', isActive);

		if (!submenuMatched) {
			//setOpenSubmenu(null);
			setOpenSubmenu({ type: '', index: -1 });
		}
	}, [page.url, isActive]);

	useEffect(() => {
		//if (openSubmenu !== null) {
		if (openSubmenu.index !== -1 && openSubmenu.type !== '') { //
			const key = `${openSubmenu.type}-${openSubmenu.index}`;
			if (subMenuRefs.current[key]) {
				setSubMenuHeight((prevHeights) => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0,
				}));
			} else {
				setSubMenuHeight({});
			}
		}
	}, [openSubmenu]);

	const handleSubmenuToggle = (index, menuType) => {
		setOpenSubmenu((prevOpenSubmenu) => {
			//console.log('menuType:', menuType);
			//console.log('index:', index);
			//console.log('prevOpenSubmenu:', prevOpenSubmenu);
			if (prevOpenSubmenu && prevOpenSubmenu.index == index && prevOpenSubmenu.type == menuType) {
				//console.log('sm prevOpenSubmenu:', prevOpenSubmenu);
				return { type: '', index: -1 };
			}
			return { type: menuType, index };
		});
	};

  const navItems = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      subItems: [{ name: "Ecommerce", path: route('tailadmin.dashboard'), pro: false }],
	    visible: true,
    },
    {
      icon: <CalenderIcon />,
      name: "Calendar",
      path: route('tailadmin.calendar'),
      visible: false,
    },
    {
      icon: <UserCircleIcon />,
      name: "User Profile",
      path: route('profile.edit'),
      visible: true,
    },
    {
      name: "Forms",
      icon: <ListIcon />,
      subItems: [{ name: "Form Elements", path: route('tailadmin.form'), pro: false }],
      visible: false,
    },
    {
      name: "Tables",
      icon: <TableIcon />,
      subItems: [{ name: "Basic Tables", path: route('tailadmin.table'), pro: false }],
      visible: false,
    },
    {
      name: "Pages",
      icon: <PageIcon />,
      subItems: [
        { name: "Blank Page", path: route('tailadmin.blank'), pro: false },
        { name: "404 Error", path: route('tailadmin.404'), pro: false },
      ],
      visible: false,
    },
    {
      icon: <UserCircleIcon />,
      name: tChoice('general.users',2),
      path: route('users.index'),
      visible: can('read-users')  ? true : false,
    },
    {
      icon: <UserCircleIcon />,
      name: tChoice('general.roles',2),
      path: route('roles.index'),
      visible: can('read-roles')  ? true : false,
    },
    {
      icon: <UserCircleIcon />,
      name: tChoice('general.user_groups',2),
      path: route('usergroups.index'),
      visible: can('read-usergroups')  ? true : false,
    },
  ];

	const renderMenuItems = (items, menuType) => (
		<ul className="flex flex-col gap-4 mb-6">
			{items.map((nav, index) => (
				<li key={nav.name}>
					{
						nav.subItems && nav.visible ?
							(
								<button
									onClick={() => handleSubmenuToggle(index, menuType)}
									className={`menu-item group ${openSubmenu?.type == menuType && openSubmenu?.index == index
										? "menu-item-active"
										: "menu-item-inactive"
										} cursor-pointer ${!isExpanded && !isHovered
											? "lg:justify-center"
											: "lg:justify-start"
										}`}
								>
									<span
										className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
											? "menu-item-icon-active"
											: "menu-item-icon-inactive"
											}`}
									>
										{nav.icon}
									</span>

									{(isExpanded || isHovered || isMobileOpen) && (
										<span className="menu-item-text">{nav.name}</span>
									)}

									{(isExpanded || isHovered || isMobileOpen) && (
										<ChevronDownIcon
											className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type == menuType &&
												openSubmenu?.index == index
												? "rotate-180 text-brand-500"
												: ""
												}`}
										/>
									)}

								</button>
							) :
							(nav.path && nav.visible && (
								<Link
									href={nav.path}
									className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
										}`}
								>
									<span
										className={`menu-item-icon-size ${isActive(nav.path)
											? "menu-item-icon-active"
											: "menu-item-icon-inactive"
											}`}
									>
										{nav.icon}
									</span>

									{(isExpanded || isHovered || isMobileOpen) && (
										<span className="menu-item-text">{nav.name}</span>
									)}
								</Link>)
							)
					}
					{
						nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
							<div className="overflow-hidden transition-all duration-300"
								ref={(el) => {
									subMenuRefs.current[`${menuType}-${index}`] = el;
								}}
								style={{
									height:
										openSubmenu?.type === menuType && openSubmenu?.index == index
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
													className={`menu-dropdown-item ${isActive(subItem.path)
														? "menu-dropdown-item-active"
														: "menu-dropdown-item-inactive"
														}`}

												>
													{subItem.name}

													<span className="flex items-center gap-1 ml-auto">
														{subItem.new && (
															<span
																className={`ml-auto ${isActive(subItem.path)
																	? "menu-dropdown-badge-active"
																	: "menu-dropdown-badge-inactive"
																	} menu-dropdown-badge`}
															>
																new
															</span>
														)}
														{subItem.pro && (
															<span
																className={`ml-auto ${isActive(subItem.path)
																	? "menu-dropdown-badge-active"
																	: "menu-dropdown-badge-inactive"
																	} menu-dropdown-badge`}
															>
																pro
															</span>
														)}
													</span>
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
				${isExpanded || isMobileOpen
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
							className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
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

				{isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}

			</div>
		</aside>
	);
}

export default AppSidebar;