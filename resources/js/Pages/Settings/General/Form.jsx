import React, { useRef, useEffect, useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PageBreadcrumb from "@/Components/Common/PageBreadCrumb";
import PageMeta from "@/Components/Common/PageMeta";
import InputGroup from "@/Components/Form/Group/InputGroup";
import { useForm, usePage, Link } from '@inertiajs/react';
import Button from "@/Components/UI/Button/Button";
import Label from '@/Components/Form/Label';
import FileInput from "@/Components/Form/Input/FileInput";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useTheme } from '@/utils/context/ThemeContext'; // Your theme hook
import { router } from '@inertiajs/react';

export default function Form({ settings, appLogo }) {
  const { t, tChoice } = useLaravelReactI18n();
  const { theme } = useTheme();
  const { errors } = usePage().props;
  const [previewLogo, setPreviewLogo] = useState(appLogo);
  const [removeLogo, setRemoveLogo] = useState(false);

  const { data, setData, post, processing } = useForm({
    app_name: settings?.app_name || null,
    app_logo: null,
    clear_app_logo: false, // For clearing the logo
    _method: 'PUT',
  });

  const canUpdateOrCreate = true;

  //console.log('preview logo:',previewLogo);

  useEffect(() => {
    if (data.app_logo) {
      console.log('xpreview logo', URL.createObjectURL(data.app_logo));
      setPreviewLogo(URL.createObjectURL(data.app_logo));
    } else if (appLogo && !data.clear_app_logo) {
      setPreviewLogo(appLogo);
    } else {
      setPreviewLogo(null);
    }
  }, [data.app_logo, appLogo, data.clear_app_logo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('settings.general.update'), {
      forceFormData: true,
      onSuccess: () => {
        // Reset the file input after successful upload
        setData('app_logo', null);
        setData('clear_app_logo', false);
      }
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('app_logo', file);
    setData('clear_app_logo', false); // If a new file is selected, don't clear
  };

  const handleClearLogo = () => {
    e.preventDefault();

    const result = Swal.fire({
      theme: theme,
      title: t('general.delete_confirm_title'),
      text: t('general.delete_image_confirm_text'),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: t('general.buttons.cancel'),
      confirmButtonColor: '#dc2626',
      confirmButtonText: t('general.buttons.confirm_delete'),
      toast: false,
    });
    if (result.isConfirmed) {
      setRemoveLogo(true);
      setData('app_logo', null);
      setData('clear_app_logo', true);
      //if (photoInput.current) photoInput.current.value = '';
      Swal.fire({
        theme: theme,
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: t('general.image_will_removed_after_save'),
        showConfirmButton: false,
        timer: 2000,
        //background: '#f0fdf4',
        //color: '#166534',
      });
    }

  };

  return (
    <>

      <PageMeta
        title={tChoice('general.general_settings', 2)}
        description={t('message.settings.general')}
      />

      <PageBreadcrumb
        breadcrumbs={[
          { label: tChoice('general.settings', 2), route: 'settings.main' },
        ]}
        pageTitle={tChoice('general.general_settings', 2)} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <InputGroup
              name="app_name"
              type="text"
              label={t('general.app_name')}
              onChange={e => setData('app_name', e.target.value)}
              hint={errors.name}
              value={data.app_name}
              required
            />

            <div>
              <Label htmlFor="app_logo">
                {t('general.app_logo')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <FileInput
                accept="image/*"
                onChange={handleFileChange}
              />

              {previewLogo && (
                <div className="mt-2 relative inline-block">
                  <img
                    src={previewLogo}
                    alt="Preview"
                    className="object-cover"
                  />
                  {
                    canUpdateOrCreate &&

                    <Button
                      type="button"
                      variant="outline"
                      title="Remove app logo"
                      style={{ transform: 'translate(50%,-50%)' }}
                      onClick={async (e) => {
                        handleClearLogo(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  }
                </div>
              )}

              {!previewLogo && appLogo && ( // Show previously uploaded logo if no new file selected and not cleared
                <div className="mt-2 relative inline-block">
                  <img
                    src={appLogo}
                    alt="Preview"
                    className="object-cover"
                  />
                  {
                    canUpdateOrCreate &&

                    <Button
                      type="button"
                      variant="outline"
                      title="Remove app logo"
                      style={{ transform: 'translate(50%,-50%)' }}
                      onClick={async (e) => {
                        handleClearLogo(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  }
                </div>
              )}

              {removeLogo && !previewLogo && (
                <div className="text-sm text-gray-500 mt-2">{t('general.image_will_removed_after_save')}</div>
              )}
              {errors.app_logo && <div className="text-red-500 text-sm mt-1">{errors.app_logo}</div>}


            </div>

            <div className="flex items-center gap-4 mt-6">
              <Link
                href={route('usergroups.index')}
                className="inline-block px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {t('general.buttons.cancel')}
              </Link>
              {
                canUpdateOrCreate &&
                <Button
                  type="submit"
                  disabled={processing}
                >
                  {tChoice('general.save_changes', 2)}
                </Button>
              }

            </div>

          </form>
        </div>
      </div>

    </>
  )
}