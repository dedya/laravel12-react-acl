// hooks/useDelete.js
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: t('general.buttons.cancel'),
      confirmButtonColor: '#dc2626',
      confirmButtonText: t('general.buttons.confirm_delete'),
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route(routeName, resourceId));
      }
    });
  };

  return handleDelete;
};

export default useDelete;
