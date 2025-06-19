import React, { useRef, useEffect } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/utils/can';

// Import Form Components
import {
  TextInput
} from '@/Components/Form';

export default function PermissionMatrix({ auth, role, all_permissions }) {
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
        .filter(p => actions.includes(p.name.split('-')[0]) && pages.includes(p.name.split('-')[1]))
        .map(p => p.name);

    // Get all permission names for a column (action)
    const getColumnPermissions = (action) =>
        all_permissions
            .filter(p => p.name.startsWith(action + '-') && pages.includes(p.name.split('-')[1]))
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
    <AuthenticatedLayout
        user={auth?.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {isEdit ?  general?.edit_role : general?.create_role}
            </h2>}
    >
        <Head title={isEdit ? general?.edit_role : general?.create_role} />
        
        <div className="max-w-2xl mx-auto py-8">
            <div className="bg-white rounded shadow p-6">              
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        label= {general?.role_name}
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        error={errors.name}
                        inputRef={firstInputRef} // Focus on this input 
                        required
                    />
            
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{general?.permissions}</label>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2 border text-center bg-gray-50">
                                            <input
                                                type="checkbox"
                                                checked={isAllChecked}
                                                onChange={e => handleCheckAll(e.target.checked)}
                                            /> &nbsp;Check All
                                        </th>
                                        {actions.map(action => (
                                            <th key={action + '-check'} className="px-3 py-2 border text-center bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={isColumnChecked(action)}
                                                    onChange={e => handleCheckColumn(action, e.target.checked)}
                                                />
                                            </th>
                                        ))}
                                    </tr>

                                    <tr>
                                        <th className="px-3 py-2 border text-center">{general?.module}</th>
                                        {actions.map(action => (
                                            <th key={action} className="px-3 py-2 border text-center capitalize">{action}</th>
                                        ))}
                                    </tr>
                                     
                                </thead>
                                <tbody>
                                    {pages.map(page => (
                                        <tr key={page}>
                                            <td className="px-3 py-2 border text-center capitalize"> {page.replace(/-/g, ' ')}</td>
                                            {actions.map(action => {
                                                const permName = `${action}-${page}`;
                                                return (
                                                    <td key={action} className="px-3 py-2 border text-center">
                                                        {permissionExists(action, page) ? (
                                                            <input
                                                                type="checkbox"
                                                                checked={data.permissions.includes(permName)}
                                                                onChange={() => handlePermissionChange(permName)}
                                                            />
                                                        ) : null}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                        { canUpdateOrCreate && (                       
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
                            >
                                {general?.submit}
                            </button>
                        )}
                        
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
);
}