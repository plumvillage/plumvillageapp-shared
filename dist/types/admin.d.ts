export declare const adminPermissions: readonly ["access_donations", "edit_content", "manage_users", "app_testing", "edit_data"];
export type AdminPermission = typeof adminPermissions[number];
export type AdminPermissions = AdminPermission[];
export declare function isAdminPermission(value: unknown): value is AdminPermission;
//# sourceMappingURL=admin.d.ts.map