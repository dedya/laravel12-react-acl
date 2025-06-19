import { createContext, useContext, useState, useEffect } from "react";

// 1. Define the Context (no type definition here in JS)
const SidebarContext = createContext(null);

// 2. Define the Provider
export const SidebarProvider = ({ children }) => {
	const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null); // Assuming it's a string key

	useEffect(() => {
		console.log('use sidebar context :');

		//handle resize
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			console.log('mobile size:',mobile);

			setIsMobile(mobile);

			if (!mobile) {
        setIsMobileOpen(false);
      }

		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
      window.removeEventListener("resize", handleResize);
    };

	}, []);

  const toggleSidebar = () => setIsExpanded(prev => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen(prev => !prev);
  const toggleSubmenu = (item) => {
    setOpenSubmenu(prev => (prev === item ? null : item));
  };

	// The value provided to consumers
	const contextValue = {
		isExpanded,
		isMobileOpen,
		isHovered,
		activeItem,
		openSubmenu,
		toggleSidebar,
		toggleMobileSidebar,
		setIsHovered, // You'd expose setters directly if needed, or wrapper functions
		setActiveItem,
		toggleSubmenu,
	};

	return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};


export const useSidebar = () => {
	const context = useContext(SidebarContext);
	
	if (context == null) { // Check if context is used outside provider (good practice)
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

	return context;
};