import React, { useRef, useEffect } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/utils/can';

// Import Form Components
import {
    TextInput
} from '@/Components/Form';
import PageMeta from "@/Components/Common/PageMeta";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PageBreadcrumb from "@/Components/Common/PageBreadCrumb";
import ComponentCard from "@/Components/Common/ComponentCard";
import Button from "@/Components/UI/Button/Button";
import Input from "@/Components/Form/Input/InputField";
import Label from "@/Components/Form/Label";
import InputError from '@/Components/InputError';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/Components/UI/Table";
import Checkbox from "@/Components/Form/Input/Checkbox";
import InputGroup from "@/Components/Form/Group/InputGroup";

export default function PermissionMatrix({ auth, role, all_permissions }) {
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
    // Define the actions and pages you want to show
    const actions = ['create', 'read', 'update', 'delete'];

    const canUpdateOrCreate = can('update-roles') || can('create-roles');

    const pages = Array.from(
        new Set(
            all_permissions
                .map(p => p.name.split('-').slice(1).join('-'))
                .filter(Boolean)
        )
    );

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const isEdit = !!role;
    const { errors, general } = usePage().props;
    const { data, setData, post, put, processing } = useForm({
        name: role?.name || '',
        permissions: role?.permissions?.map(p => p.name) || [],
    });

    // Helper to check if permission exists in DB
    const permissionExists = (action, page) =>
        all_permissions.some(p => p.name === `${action}-${page}`);

    // Get all permission names for visible matrix
    const allMatrixPermissions = all_permissions
        .filter(
            p =>
                actions.includes(p.name.split('-')[0]) &&
                pages.includes(p.name.split('-').slice(1).join('-'))
        )
        .map(p => p.name);

    // Get all permission names for a column (action)
    const getColumnPermissions = (action) =>
        all_permissions
            .filter(
                p =>
                    p.name.startsWith(action + '-') &&
                    pages.includes(p.name.split('-').slice(1).join('-'))
            )
            .map(p => p.name);

    // Check if all permissions are checked
    const isAllChecked = allMatrixPermissions.length > 0 && allMatrixPermissions.every(p => data.permissions.includes(p));

    // Check if all permissions in a column are checked
    const isColumnChecked = (action) => {
        const colPerms = getColumnPermissions(action);
        return colPerms.length > 0 && colPerms.every(p => data.permissions.includes(p));
    };

    // Handle check all
    const handleCheckAll = (checked) => {
        if (checked) {
            setData('permissions', Array.from(new Set([...data.permissions, ...allMatrixPermissions])));
        } else {
            setData('permissions', data.permissions.filter(p => !allMatrixPermissions.includes(p)));
        }
    };

    // Handle check column
    const handleCheckColumn = (action, checked) => {
        const colPerms = getColumnPermissions(action);
        if (checked) {
            setData('permissions', Array.from(new Set([...data.permissions, ...colPerms])));
        } else {
            setData('permissions', data.permissions.filter(p => !colPerms.includes(p)));
        }
    };

    const handlePermissionChange = (permName) => {
        setData('permissions', data.permissions.includes(permName)
            ? data.permissions.filter(p => p !== permName)
            : [...data.permissions, permName]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('roles.update', role.id), { preserveScroll: true });
        } else {
            post(route('roles.store'), { preserveScroll: true });
        }
    };

    return (
        <>
            {/*<Head title={isEdit ? general?.edit_role : general?.create_role} />*/}

            <PageMeta
                title={isEdit ? general.edit_role : general.create_role}
            />

            <PageBreadcrumb pageTitle={tChoice('general.roles', 2)} />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputGroup
                            name="name"
                            type="text"
                            label={t('general.name')}
                            onChange={e => setData('name', e.target.value)}
                            hint={errors.name}
                            value={data.name}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-400">{general?.permissions}</label>
                            <div className="max-w-full overflow-x-auto">
                                <Table>
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                                                <Checkbox
                                                    checked={isAllChecked}
                                                    onChange={e => handleCheckAll(e.target.checked)}
                                                    label={t('general.check_all')}
                                                    />
                                                
                                            </TableCell>
                                            {actions.map(action => (
                                                <TableCell key={action + '-check'} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                                    <Checkbox
                                                        checked={isColumnChecked(action)}
                                                        onChange={e => handleCheckColumn(action, e.target.checked)}
                                                    />

                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{general?.module}</TableCell>
                                            {actions.map(action => (
                                                <TableCell key={action} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize">{action}</TableCell>
                                            ))}
                                        </TableRow>

                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {pages.map(page => (
                                            <TableRow key={page}>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize"> {page.replace(/-/g, ' ')}</TableCell>
                                                {actions.map(action => {
                                                    const permName = `${action}-${page}`;
                                                    return (
                                                        <TableCell key={action} className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 capitalize">

                                                            {permissionExists(action, page) ? (
                                                                <Checkbox
                                                                    checked={data.permissions.includes(permName)}
                                                                    onChange={() => handlePermissionChange(permName)}
                                                                />

                                                            ) : null}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {errors.permissions && <div className="text-red-500 text-sm mt-1">{errors.permissions}</div>}
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <Link
                                href={route('roles.index')}
                                className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                {general?.cancel}
                            </Link>
                            {canUpdateOrCreate && (
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
                                >
                                    {general?.submit}
                                </Button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}