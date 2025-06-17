import React, { useRef, useEffect,useState } from 'react';
import { useForm, usePage, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/utils/can';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { swalConfirmDeleteDefaults } from '@/utils/swalDefaults';

// Import Form Components
import {
  TextInput,
  SelectDropdown
} from '@/Components/Form';

export default function Form({ user, roles, groups, auth }) {

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const isEdit = !!user;
  const { errors, general} = usePage().props;
  const photoInput = useRef();
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { data, setData, post, put, processing } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.roles?.[0]?.name || '',
    user_group_id: user?.user_group_id || '',
    photo: null,
    _method:isEdit?'PUT':'POST',
    remove_photo: false,
  });

  // Handle file change
  const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      setData('photo', file);
      setRemovePhoto(true);
      setData('remove_photo', true);

      if (file) {
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        setPhotoPreview(null);
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data); 
     isEdit
    ? post(route('users.update', user.id),{forceFormData:true})
    : post(route('users.store'),{forceFormData:true});
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {isEdit ? general.edit_user : general.create_user}
        </h2>
      }
    >
      <Head title={isEdit ? general.edit_user : general.create_user} />
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

            <TextInput
                label={general?.email}
                name="email"
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                error={errors.email}
                required
            />

            <TextInput
              label={
                <>
                  {general?.password}
                  {isEdit && (
                    <span className="text-xs text-gray-400">({general?.leave_blank})</span>
                  )}
                </>
              }
              name="password"
              type="password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              error={errors.password}
              required={!isEdit}
            />

            <SelectDropdown
              label={general?.role}
              name="role"
              value={data.role}
              onChange={e => setData('role', e.target.value)}
              options={roles.map(role => ({ value: role.name, label: role.name }))}
              error={errors.role}
              required
            />

            <SelectDropdown
              label={general?.user_group}
              name="user_group_id"
              value={data.user_group_id}
              onChange={e => setData('user_group_id', e.target.value)}
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              error={errors.user_group_id}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {general.profile_image}
              </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={photoInput}
                  onChange={handlePhotoChange}
                  className="border rounded px-3 py-2 w-full"
                />
                
                {(photoPreview || (user?.photo && !removePhoto)) && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={photoPreview ? photoPreview : `/storage/${user.photo}`}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-full"
                    />
                    {
                      (can('update-user') || can('create-user')) &&

                      <button
                        type="button"
                        className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center opacity-70 hover:opacity-100"
                        title="Remove photo"
                        style={{ transform: 'translate(50%,-50%)' }}
                        onClick={async () => {
                          const result = await Swal.fire({
                            title: general?.delete_confirm_title,
                            text: general?.delete_image_confirm_text,
                            icon: 'warning',
                            confirmButtonText: general?.delete_confirm_yes || 'Yes, delete it!',
                            cancelButtonText: general?.cancel,
                            toast: false,
                            ...swalConfirmDeleteDefaults,                            
                          });
                          if (result.isConfirmed) {
                            setRemovePhoto(true);
                            setData('photo', null);
                            setData('remove_photo', true);
                            setPhotoPreview(null);
                            if (photoInput.current) photoInput.current.value = '';
                            Swal.fire({
                              toast: true,
                              position: 'top-end',
                              icon: 'success',
                              title: general?.image_will_removed_after_save,
                              showConfirmButton: false,
                              timer: 2000,
                              background: '#f0fdf4',
                              color: '#166534',
                            });
                          }
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>
                )}

                {removePhoto && !photoPreview && (
                  <div className="text-sm text-gray-500 mt-2">{general?.image_will_removed_after_save}</div>
                )}
                {errors.photo && <div className="text-red-500 text-sm mt-1">{errors.photo}</div>}
              </div>


            <div className="flex items-center gap-4 mt-6">
              <Link
                href={route('users.index')}
                className="text-gray-600 hover:underline"
              >
                {general?.cancel}
              </Link>              
              {
                (can('update-user') || can('create-user')) &&
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
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
