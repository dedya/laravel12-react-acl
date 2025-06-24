import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { SidebarProvider, useSidebar } from "../utils/context/SidebarContext";
import { Outlet } from "react-router";
import { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { swalSuccessDefaults, swalErrorDefaults} from '@/utils/swalDefaults';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@/utils/context/ThemeContext';

const LayoutContent = ({ children }) => {
  //console.log('children',children);
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { flash, alertTimer,errors } = usePage().props;
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    const duration = alertTimer || 4000;

    // Show validation errors
    if (errors && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => {
        toast.error(msg, {
          position: "top-right",
          autoClose: alertTimer || 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    }

    //Show flash success or error using SweetAlert
    const showFlashAlert = (message, defaults) => {
      Swal.fire({
        title: message,
        timer: duration,
        theme: isDarkTheme ? 'dark' : 'light',
        ...defaults,
      });
    };

    if (flash?.success) {
      console.log('success',flash?.success);
      toast.success(flash.success);
    } else if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash?.success, flash?.error, errors, alertTimer]);

  return (
    <>
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

      <ToastContainer
        position="top-right" // You can customize the position
        autoClose={5000}    // Close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? 'dark' : 'light'}
        
      />
    </>
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