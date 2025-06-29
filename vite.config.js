import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // Import the plugin svg
import tailwindcss from '@tailwindcss/vite'; // Import the Tailwind CSS Vite plugin
import i18n from 'laravel-react-i18n/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        svgr(),
        i18n(), 
    ],
});
