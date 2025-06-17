import { usePage } from '@inertiajs/react';

export function can(permission) {
    const permissions = usePage().props.permissions || [];
    return permissions.includes(permission);
}