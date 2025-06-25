import React, { useRef, useEffect, useState } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
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
import PageMeta from "@/Components/Common/PageMeta";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PageBreadcrumb from "@/Components/Common/PageBreadCrumb";
import ComponentCard from "@/Components/Common/ComponentCard";
import Button from "@/Components/UI/Button/Button";
import Input from "@/Components/Form/Input/InputField";
import Label from "@/Components/Form/Label";
import InputError from '@/Components/InputError';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/Components/UI/Table";
import Select from "@/Components/Form/Select";
import FileInput from "@/Components/Form/Input/FileInput";
import InputGroup from "@/Components/Form/Group/InputGroup";
import SelectGroup from "@/Components/Form/Group/SelectGroup";
import CheckboxGroup from "@/Components/Form/Group/CheckboxGroup";
import { useTheme } from '@/utils/context/ThemeContext'; // Your theme hook

export default function Form({ user, roles, groups, auth }) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
  const { theme } = useTheme();

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const isEdit = !!user;
  const { errors, general } = usePage().props;
  const photoInput = useRef();
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const canUpdateOrCreate = can('update-users') || can('create-users');

  const { data, setData, post, put, processing } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    change_password: false,
    role: user?.roles?.[0]?.name || '',
    user_group_id: user?.user_group_id || '',
    photo: null,
    _method: isEdit ? 'PUT' : 'POST',
    remove_photo: false,
  });

  // Handle file change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    //setRemovePhoto(true);
    //setData('remove_photo', true);

    if (file) {
      setData('photo', file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    isEdit
      ? post(route('users.update', user.id), { forceFormData: true })
      : post(route('users.store'), { forceFormData: true });
  };

  const [changePassword, setChangePassword] = useState(!isEdit);
  console.log('error name', errors.name);
  return (

    <>
      <PageMeta
        title={isEdit ? t('general.edit_user') : t('general.create_user')}
      />

      <PageBreadcrumb pageTitle={tChoice('general.users', 2)} />

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

            <InputGroup
              name="email"
              type="email"
              label={t('general.email')}
              onChange={e => setData('email', e.target.value)}
              hint={errors.email}
              value={data.email}
              required
            />

            {
              isEdit && (
                <>
                  <CheckboxGroup
                    label={t('general.change_password')}
                    name="change_password"
                    checked={changePassword}
                    onChange={(e) => {
                      console.log(e);
                      setChangePassword(e.target.checked);
                      // Clear password fields if checkbox is unchecked
                      if (!e.target.checked) {
                        setData('password', '');
                        setData('change_password', false);
                      } else {
                        setData('change_password', e.target.checked);
                      }
                    }}
                  />
                </>
              )
            }

            {(changePassword || !isEdit) && (
              <>
                <InputGroup
                  name="email"
                  type="email"
                  label={t('general.password')}
                  onChange={e => setData('password', e.target.value)}
                  hint={errors.password}
                  value={data.password}
                  required={changePassword || !isEdit}
                />
              </>
            )}



            <SelectGroup
              label={tChoice('general.roles', 1)}
              name="role"
              value={data.role}
              onChange={e => setData('role', e.target.value)}
              options={roles.map(role => ({ value: role.name, label: role.name }))}
              hint={errors.role}
              required
            />

            <SelectGroup
              label={tChoice('general.user_groups', 1)}
              name="user_group_id"
              value={data.user_group_id}
              onChange={e => setData('user_group_id', e.target.value)}
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              hint={errors.user_group_id}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('general.profile_image')}
              </label>
              <FileInput
                accept="image/*"
                onChange={handlePhotoChange}
              />

              {(photoPreview || (user?.photo_url && !removePhoto)) && (
                <div className="mt-2 relative inline-block">
                  <img
                    src={photoPreview ? photoPreview : user.photo_url}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-full"
                  />
                  {
                    canUpdateOrCreate &&

                    <Button
                      type="button"
                      variant="outline"
                      title="Remove photo"
                      style={{ transform: 'translate(50%,-50%)' }}
                      onClick={async () => {
                        const result = await Swal.fire({
                          theme:theme,
                          title: general?.delete_confirm_title,
                          text: general?.delete_image_confirm_text,
                          icon: 'warning',
                          showCancelButton:true,
                          confirmButtonText: general?.delete_confirm_yes || 'Yes, delete it!',
                          cancelButtonText: general?.cancel,
                          toast: false,
                          //...swalConfirmDeleteDefaults,
                        });
                        if (result.isConfirmed) {
                          setRemovePhoto(true);
                          setData('photo', null);
                          setData('remove_photo', true);
                          setPhotoPreview(null);
                          if (photoInput.current) photoInput.current.value = '';
                          Swal.fire({
                            theme:theme,
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: general?.image_will_removed_after_save,
                            showConfirmButton: false,
                            timer: 2000,
                            //background: '#f0fdf4',
                            //color: '#166534',
                          });
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
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
                className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {general?.cancel}
              </Link>
              {
                canUpdateOrCreate &&
                <Button
                  type="submit"
                  disabled={processing}

                >
                  {t('general.buttons.submit')}
                </Button>
              }


            </div>
          </form>
        </div>
      </div>
    </>
  );
}
