import { router } from '@inertiajs/react';

export default function usePagination(routeName, filter, setFilter) {
  const handlePerPageChange = (perPage) => {
    const newFilter = { ...filter, per_page: perPage };
    setFilter(newFilter);
    router.get(route(routeName), { ...newFilter, page: 1 }, {
      preserveState: true,
      replace: true,
    });
  };

  const handlePage = (url) => {
    router.get(url, filter, {
      preserveState: true,
      replace: true,
    });
  };

  return {
    handlePerPageChange,
    handlePage,
  };
}
