import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from './utils/context/ThemeContext';
import { StrictMode } from "react";
import AppLayout  from '@/Layouts/AppLayout'; 
import AuthLayout from '@/Layouts/AuthLayout';  
import ErrorLayout from '@/Layouts/ErrorLayout';  
import { HelmetProvider } from 'react-helmet-async';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    //title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        //resolvePageComponent(
          //  `./Pages/${name}.jsx`,
            //import.meta.glob('./Pages/**/*.jsx'),
        //),
        // Step 1: Dynamically import all page components from the specified directory.
        // The 'eager: true' option ensures all modules are loaded immediately,
        // which is useful for setting default layouts at this stage.
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });

        // Step 2: Get the specific page module based on the 'name' provided by Inertia.
        // 'pages' is an object like { './Pages/Dashboard.jsx': ModuleObject, ... }
        let page = pages[`./Pages/${name}.jsx`];

        // Step 3: Assign a default layout if the page doesn't explicitly define one.
        // 'page.default' refers to the component exported with 'export default' from the page file.
        // We're checking if the page's default export already has a 'layout' property.
        // If not, we assign a function that wraps the page component with AppLayout.
        // This ensures every page gets AppLayout by default unless it specifies otherwise.
        if (name.startsWith('TailAdmin/Auth/') || name.startsWith('Auth/')) { // : If page is in 'Auth/' directory
            page.default.layout = page.default.layout || (pageComponent => (
                // The `pageComponent` here is the actual React component for the page (e.g., Dashboard).
                // It will be rendered as children of AppLayout.
                <AuthLayout>{pageComponent}</AuthLayout> // Use AuthLayout for auth pages
                
            ));
        } else if (name.startsWith('TailAdmin/Error/')) { // : If page is in 'Auth/' directory
            page.default.layout = page.default.layout || (pageComponent => (
                // The `pageComponent` here is the actual React component for the page (e.g., Dashboard).
                // It will be rendered as children of AppLayout.
                <ErrorLayout>{pageComponent}</ErrorLayout> // Use AuthLayout for auth pages
                
            ));
        } else {
            page.default.layout = page.default.layout || (pageComponent => (
                // The `pageComponent` here is the actual React component for the page (e.g., Dashboard).
                // It will be rendered as children of AppLayout.
                <AppLayout>{pageComponent}</AppLayout>
            ));
        }

        return page;

    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <HelmetProvider>
                <StrictMode>
                    <ThemeProvider>
                        <LaravelReactI18nProvider 
                            locale={'en'}
                            fallbackLocale={'en'}
                            files={import.meta.glob('/lang/*.json')}
                            >
                            <App {...props} />
                        </LaravelReactI18nProvider>
                    </ThemeProvider>
                </StrictMode>
            </HelmetProvider>
            
        );
    },
    progress: {
        color: '#4B5563',
    },
});
