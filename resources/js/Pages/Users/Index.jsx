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
  const { users, general, filters, alertTimer} = usePage().props;
 
  const canCreate = can('create-users');
  const canUpdate = can('update-users');
  const canDelete = can('delete-users');

  // State for filter form
  const [filter, setFilter] = useState({
    name: filters.name || '',
    email: filters.email || '',
  });

  const params = new URLSearchParams({ ...filter, page: users.current_page }).toString();

  // Handle filter form submit
  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('users.index'), filter, { preserveState: true, replace: true });
  };

  // Handle pagination with filter
  const handlePage = (url) => {
    router.get(url, filter, { preserveState: true, replace: true });
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
      router.delete(route('users.destroy', userId), {
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
          {general?.user_list_title || 'User List'}
        </h2>
      }
    >
      <Head title={general?.users_page_title || 'Users'} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          { canCreate && (
            <Link
              href={route('users.create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {general?.add_button || '+ Add'}
            </Link>
          )}
        </div>

        {/* Filter Form */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap gap-4 items-end mb-4 bg-gray-50 p-4 rounded"
        >
          <div>
            <label className="block text-xs text-gray-600 mb-1">{general?.name || "Name"}</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={filter.name}
              onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
              placeholder={general?.search_name||"Search name"}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">{general?.email || "Email"}</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={filter.email}
              onChange={e => setFilter(f => ({ ...f, email: e.target.value }))}
              placeholder="Search email"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
          {general?.search}
          </button>
        </form>

        <div className="overflow-x-auto bg-white rounded shadow">
          <div className="mb-2 text-sm text-gray-600">
            &nbsp;&nbsp;{users.from} &nbsp;-&nbsp;
              {users.to}
              &nbsp;/&nbsp;
              {users.total}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.id || "ID"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.name || "Name"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.email || "Email"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.role || "Role"}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{general?.actions || "Actions"}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                    {general?.no_data_found}
                  </td>
                </tr>
              )}
              {users.data.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        {user?.photo_url && (
                          <img
                            src={user?.photo_url}
                            alt="Profile"
                            className="h-16 w-16 object-cover rounded-full"
                          />
                        )}
                        <span>{user.name}</span>
                      </div>
                    </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.roles && user.roles.length > 0
                      ? user.roles.map(r => r.name).join(', ')
                      : '-'}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    
                       {canUpdate && 
                      (
                          user.is_active ? (
                            <button
                              onClick={() =>
                                router.patch(`${route('users.disable', user.id)}?${params}`, {}, {
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
                                router.patch(`${route('users.enable', user.id)}?${params}`, {}, {
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
                        href={route('users.edit', user.id)}
                        className="inline-block text-blue-600 hover:underline"
                      >
                        <FaEdit size={24} />                      
                      </Link>
                    )}

                    {canDelete && 
                      <button
                        title={general.delete}
                        type="button"
                        onClick={e => handleDelete(e, user.id, user.name)}
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
                {users.links.map(link => (
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