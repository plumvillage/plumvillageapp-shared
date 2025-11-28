export const adminPermissions = [
    'access_donations',
    'edit_content',
    'manage_users',
    'app_testing',
    'edit_data',
];
const adminPermissionMap = {
    access_donations: true,
    edit_content: true,
    manage_users: true,
    app_testing: true,
    edit_data: true,
};
export function isAdminPermission(value) {
    return typeof value === 'string' && (value in adminPermissionMap);
}
