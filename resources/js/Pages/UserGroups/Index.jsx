import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// Import SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { can } from '@/utils/can';

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
import Switch from "@/Components/Form/Switch/Switch";
import IconButton from "@/Components/UI/Button/IconButton";
import { useTheme } from '@/utils/context/ThemeContext'; // Your theme hook

// Pagination controls component
import PaginationControls from "@/Components/UI/PaginationControls";
import usePagination from '@/hooks/usePagination';

import useDelete from '@/hooks/useDelete';
export default function Index({ auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
  const { groups, filters, perPageOptions } = usePage().props;
  const { theme } = useTheme();

  const canCreate = can('create-user-groups');
  const canUpdate = can('update-user-groups');
  const canDelete = can('delete-user-groups');

  const params = new URLSearchParams({ page: groups.current_page }).toString();

  const [filter, setFilter] = useState({
    per_page: filters.per_page || 20  });
  
  const { handlePerPageChange, handlePage } = usePagination('usergroups.index', filter, setFilter);

  //handle delete using custom hook
  const deleteHandler = useDelete({ theme });

  const handleDelete = (e, group) => {
    deleteHandler({
      e,
      routeName: 'usergroups.destroy',
      resourceId: group.id,
      resourceKey: group.name,
      resourceLabelKey: tChoice('general.user_groups',1)
    });
  };

  return (

    <>
      {/*<Head title={general?.user_groups_page_title || 'User Groups'} />*/}
      <PageMeta
        title={tChoice('general.user_groups', 2)}
        description={tChoice('general.user_groups', 2)}
      />

      <PageBreadcrumb pageTitle={tChoice('general.user_groups', 2)} />

      <div className="space-y-6">
        <ComponentCard title="">
          <div className="overflow-hidden rounded-xl flex justify-end p-4">

            {canCreate && (
              <Link
                href={route('usergroups.create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ml-auto"
              >
                {t('general.buttons.create')}
              </Link>
            )}
          </div>

          {/* Top pagination controls */}
         <PaginationControls
            records={groups}
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
                {groups.length === 0 && (
                  <TableRow key={group.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start" coslpan="4">
                      {t('general.no_data_found')}
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
                      <div className="flex gap-4">

                      {canUpdate &&
                        (
                          group.is_active ? (
                            <>
                            <Switch
                                label=""
                                defaultChecked={true}
                                onChange={() =>
                                  router.patch(`${route('usergroups.disable', group.id)}?${params}`, {}, {
                                  preserveState: true,
                                  replace: true,
                                })
                                }

                              />
                            {/*
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
                            </button>*/}
                            </>
                          ) : (
                            <>
                              <Switch
                                label=""
                                defaultChecked={false}
                                onChange={() =>
                                  router.patch(`${route('usergroups.enable', group.id)}?${params}`, {}, {
                                    preserveState: true,
                                    replace: true,
                                  })
                                }

                              />
                              {/*
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
                              </button>*/}
                            </>
                          )
                        )}

                      {canUpdate && (
                        <>
                        <IconButton
                          type="link"
                          onClick={route('usergroups.edit', group.id)}
                          className="text-blue-600">
                          <FaEdit size={24} />
                        </IconButton>
                        {/*
                          <Link
                            title={general.edit}
                            href={route('usergroups.edit', group.id)}
                            className="inline-block text-blue-600 hover:underline"
                          >
                            <FaEdit size={24} />
                          </Link>*/}
                        </>
                        
                      )}

                      {canDelete &&
                        <>
                        <IconButton
                          type="button"
                          onClick={e => handleDelete(e, group)}
                          className="text-red-600">
                          <FaTrashAlt size={24} />
                        </IconButton>
                        {/*
                        <button
                          title={general.delete}
                          type="button"
                          onClick={e => handleDelete(e, group.id, group.name)}
                          className="inline-block text-red-600 hover:underline bg-transparent border-0 p-0 m-0 cursor-pointer"
                        >
                          <FaTrashAlt size={24} />
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
          records={groups}
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