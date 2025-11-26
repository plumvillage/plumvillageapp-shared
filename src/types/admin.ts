export const adminPermissions = [
  'access_donations',
  'edit_content',
  'manage_users',
  'app_testing',
  'edit_data',
] as const;

export type AdminPermission = typeof adminPermissions[number];
export type AdminPermissions = AdminPermission[];

const adminPermissionMap: { [key in AdminPermission]: true } = {
  access_donations: true,
  edit_content: true,
  manage_users: true,
  app_testing: true,
  edit_data: true,
};

export function isAdminPermission(value: unknown): value is AdminPermission {
  return typeof value === 'string' && (value in adminPermissionMap);
}