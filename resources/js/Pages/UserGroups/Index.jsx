import React , { useState, useEffect }from 'react';
import { Link, usePage, router} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
// Import SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { can } from '@/utils/can';
import { swalSuccessDefaults, swalConfirmDeleteDefaults} from '@/utils/swalDefaults';

import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa'; 

export default function Index({ auth }) {
  const { groups, general, alertTimer} = usePage().props;
 
  const canCreate = can('create-user-groups');
  const canUpdate = can('update-user-groups');
  const canDelete = can('delete-user-groups');

  const params = new URLSearchParams({page: groups.current_page }).toString();


  const handlePage = (url) => {
    router.get(url, { preserveState: true, replace: true });
  };

  // Handler for delete confirmation using SweetAlert2
  const handleDelete = (e, userId, userName) => {
    e.preventDefault();
    Swal.fire({
      title: general?.delete_confirm_title || 'Are you sure ?',
      text: general?.delete_confirm_text || 'This user will be deleted permanently!',
      confirmButtonText: general?.delete_confirm_yes || 'Yes, delete it!',
      cancelButtonText: general?.cancel,
      ...swalConfirmDeleteDefaults,
    }).then((result) => {
      if (result.isConfirmed) {
      router.delete(route('usergroups.destroy', userId), {
        onSuccess: () => {
        Swal.fire({
          title:
          (general?.data_is_deleted
            ? general.data_is_deleted.replace(':name', userName)
            : `User "${userName}" is deleted successfully!`),
          timer: alertTimer || 4000,         
          ...swalSuccessDefaults,
        });
        },
      });
      }
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {general?.user_group_list_title || 'User Group List'}
        </h2>
      }
    >
      <Head title={general?.user_groups_page_title || 'User Groups'} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          { canCreate && (
            <Link
              href={route('usergroups.create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {general?.add_button || '+ Add'}
            </Link>
          )}
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <div className="mb-2 text-sm text-gray-600">
            &nbsp;&nbsp;{groups.from} &nbsp;-&nbsp;
              {groups.to}
              &nbsp;/&nbsp;
              {groups.total}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.id || "ID"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.name || "Name"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.actions || "Actions"}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {groups.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                    {general?.no_data_found}
                  </td>
                </tr>
              )}
              {groups.data.map(group => (
                <tr key={group.id}>
                  <td className="px-4 py-2">{group.id}</td>
                  <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <span>{group.name}</span>
                      </div>
                    </td>
                  <td className="px-4 py-2 space-x-2">
                    
                       {canUpdate && 
                      (
                          group.is_active ? (
                            <button
                              onClick={() =>
                                router.patch(`${route('usergroups.disable', group.id)}?${params}`, {}, {
                                  preserveState: true,
                                  replace: true,
                                })
                              }
                              className="text-green-600 hover:underline cursor-pointer"
                              title={general?.enable || "Enable"} 
                            >
                              <FaToggleOn size={24} />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                router.patch(`${route('usergroups.enable', group.id)}?${params}`, {}, {
                                  preserveState: true,
                                  replace: true,
                                })
                              }
                              className="text-yellow-600 hover:underline cursor-pointer"
                              title={general?.disable || "Disable"}
                            >
                              <FaToggleOff size={24} />
                            </button>
                          )
                        )}

                    {canUpdate && (
                      <Link
                        title={general.edit}
                        href={route('usergroups.edit', group.id)}
                        className="inline-block text-blue-600 hover:underline"
                      >
                        <FaEdit size={24} />                      
                      </Link>
                    )}

                    {canDelete && 
                      <button
                        title={general.delete}
                        type="button"
                        onClick={e => handleDelete(e, group.id, group.name)}
                        className="inline-block text-red-600 hover:underline bg-transparent border-0 p-0 m-0 cursor-pointer"
                      >
                        <FaTrashAlt size={24} />                      
                      </button>
                    }
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          <div className="mt-4">
                {groups.links.map(link => (
                  <button
                    key={link.label}
                    disabled={!link.url}
                    onClick={() => link.url && handlePage(link.url)}
                    className={`px-3 py-1 mx-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}