import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
// Import SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Add this line
import { can } from '@/utils/can';

export default function RoleIndex({ auth }) {
  const { roles, general } = usePage().props;

    // Handler for delete confirmation using SweetAlert2
    const handleDelete = (e, roleId, roleName) => {
      e.preventDefault();
      Swal.fire({
        title: general?.delete_confirm_title || 'Are you sure?',
        text: general?.delete_confirm_text || 'This role will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: general?.delete_confirm_yes || 'Yes, delete it!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
              router.delete(route('roles.destroy', roleId),{
                onSuccess: () => {
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'success',
                  title:
                    (general?.data_is_deleted
                    ? general.data_is_deleted.replace(':name', roleName)
                    : `Role "${roleName}" is deleted successfully!`),
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  background: '#d1fae5',
                  color: '#166534',
                });
              },
            });
          }
        }
      });
    };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {general?.role_list_title || 'Roles'}
        </h2>
      }
    >
      <Head title={general?.role_page_title || 'Roles'}/>

      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          {can('create-roles') && (
            <Link
              href={route('roles.create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              {general?.add_button || '+ Add'}
            </Link>
      )}
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.id}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.name}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {roles.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-center text-gray-400">
                    {general?.no_data_found}
                  </td>
                </tr>
              )}
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="px-4 py-2">{role.id}</td>
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="px-4 py-2 space-x-2">
                    {['update-roles', 'read-roles', 'delete-roles'].some(can) && (                      
                      <Link
                        title="Edit"
                        href={route('roles.edit', role.id)}
                        className="inline-block text-blue-600 hover:underline"
                      >
                      <FaEdit size={18} />                    
                      </Link>
                    )}
                      
                  {can('delete-roles') && 
                      
                    <button
                        title="Delete"
                        type="button"
                        onClick={e => handleDelete(e, role.id, role.name)}
                        className="inline-block text-red-600 hover:underline bg-transparent border-0 p-0 m-0 cursor-pointer"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}