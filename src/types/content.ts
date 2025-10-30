
// Groups for linking content across languages
type GroupReservedKeys = 'id' | 'folders' | 'items' | 'createdAt' | 'updatedAt';
type GroupBase<SupportedLanguageCodeType extends string | number | symbol> = {
  [key in Exclude<SupportedLanguageCodeType, GroupReservedKeys>]?: string;
};

export type FolderGroup<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
  id: string;
  folders: { [K in SupportedLanguageCodeType]?: string }; // langCode -> folderId
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
} & GroupBase<SupportedLanguageCodeType>;

export type ItemGroup<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
  id: string;
  items: { [K in SupportedLanguageCodeType]?: string }; // langCode -> itemId
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
} & GroupBase<SupportedLanguageCodeType>;
