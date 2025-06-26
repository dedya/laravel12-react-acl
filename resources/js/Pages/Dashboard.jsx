import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AppLayout from '@/Layouts/AppLayout';

import { Head } from '@inertiajs/react';
import PageMeta from "@/Components/Common/PageMeta";

export default function Dashboard() {
    return (
        <>
            <PageMeta
                title="Dashboard"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                        <div className="p-6 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">

                </div>
            </div>
        </>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
