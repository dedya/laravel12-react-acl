// hooks/useDelete.js
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { swalSuccessDefaults, swalConfirmDeleteDefaults } from '@/utils/swalDefaults';

const useDelete = ({ theme = 'default' } = {}) => {
  const { t, tChoice } = useLaravelReactI18n();

  const handleDelete = ({
    e,
    routeName,         // e.g., 'users.destroy', 'roles.destroy'
    resourceId,
    resourceLabelKey,  // e.g., 'general.users', 'general.roles'
  }) => {
    if (e) e.preventDefault();

    Swal.fire({
      theme: theme,
      title: t('message.confirm.sure'),
      text: t('message.confirm.delete', {
        title: tChoice(resourceLabelKey, 1),
      }),
      cancelButtonText: t('general.buttons.cancel'),
      confirmButtonText: t('general.buttons.confirm_delete'),
        ...swalConfirmDeleteDefaults,
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route(routeName, resourceId));
      }
    });
  };

  return handleDelete;
};

export default useDelete;
