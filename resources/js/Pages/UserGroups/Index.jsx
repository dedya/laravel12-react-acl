import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
// Import SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { can } from '@/utils/can';
import { swalSuccessDefaults, swalConfirmDeleteDefaults } from '@/utils/swalDefaults';

import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import PageMeta from "@/Components/Common/PageMeta";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PageBreadcrumb from "@/Components/Common/PageBreadCrumb";
import ComponentCard from "@/Components/Common/ComponentCard";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/Components/UI/Table"; 
import Button from "@/Components/UI/Button/Button";

export default function Index({ auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
  const { groups, general, alertTimer, groupCountText } = usePage().props;

  const canCreate = can('create-user-groups');
  const canUpdate = can('update-user-groups');
  const canDelete = can('delete-user-groups');

  const params = new URLSearchParams({ page: groups.current_page }).toString();


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

    <>
      {/*<Head title={general?.user_groups_page_title || 'User Groups'} />*/}
      <PageMeta
        title={tChoice('general.user_groups', 2)}
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle={tChoice('general.user_groups', 2)} />

      <div className="space-y-6">
        <ComponentCard title="">
          <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            
            {canCreate && (
              <Link
                href={route('usergroups.create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {general?.add_button || '+ Add'}
              </Link>
            )}
          </div>

          <div className="max-w-full overflow-x-auto">
            <div className="mb-2 text-sm text-gray-600">
              &nbsp;&nbsp;{groups.from} &nbsp;-&nbsp;
              {groups.to}
              &nbsp;/&nbsp;
              {groups.total} {groupCountText}
            </div>
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{general?.id || "ID"}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{general?.name || "Name"}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{general?.actions || "Actions"}</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {groups.length === 0 && (
                  <TableRow key={group.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start" coslpan="4">
                      {general?.no_data_found}
                    </TableCell>
                  </TableRow>
                )}
                {groups.data.map(group => (
                  <TableRow key={group.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{group.id}</TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        <span>{group.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">

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
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
            <div className="mt-4">
              {groups.links.map(link => (
                <Button
                  size="sm"
							    variant="outline"
                  key={link.label}
                  disabled={!link.url}
                  onClick={() => link.url && handlePage(link.url)}
                  className={`px-3 py-1 mx-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                >
                  <span dangerouslySetInnerHTML={{ __html: link.label }} />
                </Button>
              ))}
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}