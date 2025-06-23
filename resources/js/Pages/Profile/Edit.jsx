import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PageMeta from "@/Components/Common/PageMeta";
import PageBreadcrumb from "@/Components/Common/PageBreadCrumb";
import UserMetaCard from "@/Components/UserProfile/UserMetaCard";
import UserInfoCard from "@/Components/UserProfile/UserInfoCard";

export default function Edit({ mustVerifyEmail, status }) {
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale  } = useLaravelReactI18n();

    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />

            <PageBreadcrumb pageTitle={t('general.profile')} />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
					{t('general.profile')}
				</h3>

                <div className="space-y-6">
                    <UserMetaCard 
                        mustVerifyEmail={mustVerifyEmail}
                        status={status} />
                    <UserInfoCard />
                    <DeleteUserForm />

                </div>
            </div>
        </>
    );
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
