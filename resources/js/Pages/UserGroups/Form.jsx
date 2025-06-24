import React, { useRef, useEffect, useState } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/utils/can';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { swalConfirmDeleteDefaults } from '@/utils/swalDefaults';

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
import InputGroup from "@/Components/Form/Group/InputGroup";

export default function Form({ usergroup, auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const isEdit = !!usergroup;
  const { errors, general } = usePage().props;
  const photoInput = useRef();

  const canUpdateOrCreate = can('update-user-groups') || can('create-user-groups');

  const { data, setData, post, put, processing } = useForm({
    name: usergroup?.name || '',
    _method: isEdit ? 'PUT' : 'POST',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route('usergroups.update', usergroup.id), { preserveScroll: true });
    } else {
      post(route('usergroups.store'), { preserveScroll: true });
    }
  };

  return (
    <>
      {/*<Head title={isEdit ? general.edit_group : general.create_group} />*/}

      <PageMeta
        title={isEdit ? general.edit_group : general.create_group}
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle={tChoice('general.user_groups', 2)} />


      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <InputGroup
              name="name"
              type="text"
              label={t('general.name')}
              onChange={e => setData('name', e.target.value)}
              hint={errors.name}
              value={data.name}
              required
            />
            
            <div className="flex items-center gap-4 mt-6">
              <Link
                href={route('usergroups.index')}
                className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {general?.cancel}
              </Link>
              {
                canUpdateOrCreate &&
                <Button
                  type="submit"
                  disabled={processing}
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
                >
                  {general?.submit}
                </Button>
              }


            </div>
          </form>
        </div>
      </div>

    </>
  );
}
