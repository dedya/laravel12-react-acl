import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
import Input from "@/Components/Form/Input/InputField";
import IconButton from "@/Components/UI/Button/IconButton";
import Switch from "@/Components/Form/Switch/Switch";
import { useTheme } from '@/utils/context/ThemeContext';
import PaginationControls from "@/Components/UI/PaginationControls";
import usePagination from '@/hooks/usePagination';

export default function Index({ auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
  const { users, filters, perPageOptions } = usePage().props;
  const { theme } = useTheme();

  const canCreate = can('create-users');
  const canUpdate = can('update-users');
  const canDelete = can('delete-users');

  // State for filter form
  const [filter, setFilter] = useState({
    name: filters.name || '',
    email: filters.email || '',
    per_page: filters.per_page || 20  });
  
  const { handlePerPageChange, handlePage } = usePagination('users.index', filter, setFilter);

  const params = new URLSearchParams({ ...filter, page: users.current_page }).toString();

  // Handle filter form submit
  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('users.index'), filter, { preserveState: true, replace: true });
  };

  // Handler for delete confirmation using SweetAlert2
  const handleDelete = (e, userId, userName) => {
    e.preventDefault();
    Swal.fire({
      theme: theme,
      title: t('message.confirm.sure'),
      text: t('message.confirm.delete', { 'title': tChoice('general.users', 1) }),
      showCancelButton: true,
      cancelButtonText: t('general.buttons.cancel'),
      confirmButtonColor: '#dc2626',
      confirmButtonText: t('general.buttons.confirm_delete'),
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('users.destroy', userId), {
          onSuccess: () => {
            // Success handling
          },
        });
      }
    });
  };

  return (
    <>
      <PageMeta
        title={tChoice('general.users', 2)}
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle={tChoice('general.users', 2)} />

      <div className="space-y-6">
        <ComponentCard title="">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            {canCreate && (
              <Link
                href={route('users.create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {t('general.buttons.create')}
              </Link>
            )}
          </div>

          {/* Filter Form */}
          <form
            onSubmit={handleFilter}
            className="flex flex-wrap gap-4 items-end mb-4 dark:bg-white/[0.01] p-4 rounded"
          >
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t('general.name')}</label>
              <Input
                value={filter.name}
                onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
                placeholder={t('general.search', { 'key': t('general.name') })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t('general.email')}</label>
              <Input
                value={filter.email}
                onChange={e => setFilter(f => ({ ...f, email: e.target.value }))}
                placeholder={t('general.search', { 'key': t('general.email') })}
              />
            </div>
            <Button
              type="submit"
              size="sm"
            >
              {t('general.search', { 'key': '' })}
            </Button>
          </form>

          {/* Top pagination controls */}
         <PaginationControls
            records={users}
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
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{t('general.email')}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{tChoice('general.roles', 1)}</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{tChoice('general.actions', 2)}</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.data.length === 0 && (
                  <TableRow>
                    <TableCell className="px-5 py-4 sm:px-6 text-start" colSpan="5">
                      {t('general.no_data_found')}
                    </TableCell>
                  </TableRow>
                )}
                {users.data.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.id}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.email}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.roles && user.roles.length > 0
                        ? user.roles.map(r => r.name).join(', ')
                        : '-'}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-4">
                        {canUpdate &&
                          (
                            user.is_active ? (
                              <Switch
                                label=""
                                defaultChecked={true}
                                onChange={() =>
                                  router.patch(`${route('users.disable', user.id)}?${params}`, {}, {
                                    preserveState: true,
                                    replace: true,
                                  })
                                }
                              />
                            ) : (
                              <Switch
                                label=""
                                defaultChecked={false}
                                onChange={() =>
                                  router.patch(`${route('users.enable', user.id)}?${params}`, {}, {
                                    preserveState: true,
                                    replace: true,
                                  })
                                }
                              />
                            )
                          )}

                        {canUpdate && (
                          <IconButton
                            type="link"
                            onClick={route('users.edit', user.id)}
                            className="text-blue-600">
                            <FaEdit size={24} />
                          </IconButton>
                        )}

                        {canDelete &&
                          <IconButton
                            type="button"
                            onClick={e => handleDelete(e, user.id, user.name)}
                            className="text-red-600">
                            <FaTrashAlt size={24} />
                          </IconButton>
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
            records={users}
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