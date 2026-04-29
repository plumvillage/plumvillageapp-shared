export declare const adminPermissions: readonly ["access_donations", "edit_content", "manage_users", "app_testing", "edit_data"];
export type AdminPermission = typeof adminPermissions[number];
export type AdminPermissions = AdminPermission[];
export declare function isAdminPermission(value: unknown): value is AdminPermission;
export declare const userClaims: readonly ["access_donations", "edit_content", "manage_users", "app_testing", "edit_data", "subtitle_contributor"];
export type UserClaim = typeof userClaims[number];
//# sourceMappingURL=admin.d.ts.map