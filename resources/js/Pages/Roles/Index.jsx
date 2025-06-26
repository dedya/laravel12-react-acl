import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
// Import SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Add this line
import { can } from '@/utils/can';
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
import IconButton from "@/Components/UI/Button/IconButton";
import { useTheme } from '@/utils/context/ThemeContext'; // Your theme hook

// Pagination controls component
import PaginationControls from "@/Components/UI/PaginationControls";
import usePagination from '@/hooks/usePagination';


export default function RoleIndex({ auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
  const { roles, filters, perPageOptions } = usePage().props;
  const { theme } = useTheme();

  const canCreate = can('create-roles');
  const canUpdate = can('update-roles');
  const canDelete = can('delete-roles');
  
  // State for filter form
  const [filter, setFilter] = useState({
    per_page: filters.per_page || 20  });

  const { handlePerPageChange, handlePage } = usePagination('users.index', filter, setFilter);
    
  // Handler for delete confirmation using SweetAlert2
  const handleDelete = (e, roleId, roleName) => {
    e.preventDefault();
    Swal.fire({
      theme:theme,
      title: t('message.confirm.sure'),
      text: t('message.confirm.delete',{'title' : tChoice('general.roles',1)}),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: t('general.buttons.cancel'),
      confirmButtonColor:'#dc2626',
      confirmButtonText: t('general.buttons.confirm_delete'),
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          router.delete(route('roles.destroy', roleId), {
            onSuccess: () => {
              /*
              Swal.fire({
                theme:theme,
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: t('message.success.deleted',{title : tChoice('general.roles',1), key: roleName }),
                  /*(general?.data_is_deleted
                    ? general.data_is_deleted.replace(':name', roleName)
                    : `Role "${roleName}" is deleted successfully!`),
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#d1fae5',
                color: '#166534',
                //...swalSuccessDefaults,
              });*/
            },
          });
        }
      }
    });
  };

  return (
    <>
      <PageMeta
        title={tChoice('general.roles', 2)}
      />

      <PageBreadcrumb pageTitle={tChoice('general.roles', 2)} />

      <div className="space-y-6">
        <ComponentCard title="">
          <div className="overflow-hidden rounded-xl flex justify-end p-4">

            {canCreate && (
              <Link
                href={route('roles.create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {t('general.buttons.create')}
              </Link>
            )}
          </div>

        {/* Top pagination controls */}
         <PaginationControls
            records={roles}
            filter={filter}
            onPerPageChange={handlePerPageChange}
            onPageChange={handlePage}
            t={t}
            perPageOptions={perPageOptions}
          />

          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{t('general.id')}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{t('general.name')}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{tChoice('general.actions',2)}</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {roles.data.length === 0 && (
                  <TableRow>
                    <TableCell className="px-5 py-4 sm:px-6 text-start" colSpan="5">
                      {t('general.no_data_found')}
                    </TableCell>
                  </TableRow>
                )}

                {roles.data.map(role => (
                  <TableRow key={role.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{role.id}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{role.name}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-4">
                        {canUpdate && (
                          <>
                            <IconButton
                              type="link"
                              onClick={route('roles.edit', role.id)}
                              className="text-blue-600">
                              <FaEdit size={24} />
                            </IconButton>
                            {/*
                        <Link
                          title={general?.edit || 'Edit'}
                          href={route('roles.edit', role.id)}
                          className="inline-block text-blue-600 hover:underline"
                        >
                          <FaEdit size={18} />
                        </Link>*/}
                          </>
                        )}

                        {canDelete &&
                          <>
                            <IconButton
                              type="button"
                              onClick={e => handleDelete(e, role.id, role.name)}
                              className="text-red-600">
                              <FaTrashAlt size={24} />
                            </IconButton>
                            {/*
                          <button
                            title={general?.delete || 'Delete'}
                            type="button"
                            onClick={e => handleDelete(e, role.id, role.name)}
                            className="inline-block text-red-600 hover:underline bg-transparent border-0 p-0 m-0 cursor-pointer"
                          >
                            <FaTrashAlt size={18} />
                          </button>*/}
                          </>

                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Bottom pagination controls */}
          <PaginationControls
            records={roles}
            filter={filter}
            onPerPageChange={handlePerPageChange}
            onPageChange={handlePage}
            t={t}
            perPageOptions={perPageOptions}
          />
        </ComponentCard>
      </div>
    </>
  );
}