type GroupReservedKeys = 'id' | 'folders' | 'items' | 'createdAt' | 'updatedAt';
type GroupBase<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in Exclude<SupportedLanguageCodeType, GroupReservedKeys>]?: string;
};
export type FolderGroup<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    id: string;
    folders: Record<SupportedLanguageCodeType, string>;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
} & GroupBase<SupportedLanguageCodeType>;
export type ItemGroup<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    id: string;
    items: Record<SupportedLanguageCodeType, string>;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
} & GroupBase<SupportedLanguageCodeType>;
export {};
//# sourceMappingURL=content.d.ts.map