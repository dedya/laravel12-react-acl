import React, { useRef, useEffect,useState } from 'react';
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

export default function Form({ usergroup, auth }) {

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const isEdit = !!usergroup;
  const { errors, general} = usePage().props;
  const photoInput = useRef();

  const canUpdateOrCreate = can('update-user-groups') || can('create-user-groups');

  const { data, setData, post, put, processing } = useForm({
    name: usergroup?.name || '',
    _method:isEdit?'PUT':'POST',
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
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {isEdit ? general.edit_group : general.create_group}
        </h2>
      }
    >
      <Head title={isEdit ? general.edit_group : general.create_group} />
      <div className="max-w-xl mx-auto py-8">
        <div className="bg-white rounded shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <TextInput
                label= {general?.name}
                name="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
                inputRef={firstInputRef} // Focus on this input 
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
                <button
                  type="submit"
                  disabled={processing}
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
                >
                  {general?.submit}
                </button>
              }

              
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
