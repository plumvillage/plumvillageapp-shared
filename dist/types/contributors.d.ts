export type FeaturedContributor = {
    id: string;
    roleIds: string[];
};
type ContributorReservedKeys = 'id' | 'slug' | 'website' | 'profileRoleIds' | 'defaultDocumentRoleIds' | 'roleVariationPreference' | 'createdAt' | 'updatedAt';
type ContributorBase<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in Exclude<SupportedLanguageCodeType, ContributorReservedKeys>]?: string;
};
export type ContributorRoleVariationKey = 'm' | 'f' | 'nb' | 'other';
export type Contributor<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    en: string;
    id: string;
    slug: string;
    website?: string;
    profileRoleIds?: string[];
    defaultDocumentRoleIds?: string[];
    roleVariationPreference?: ContributorRoleVariationKey;
    hasImage?: boolean;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
} & ContributorBase<SupportedLanguageCodeType>;
export type ContributorRoleNameVariations = Partial<{
    [key in ContributorRoleVariationKey]: string;
}>;
type ContributorRoleLocalized = {
    name: string;
    variations?: ContributorRoleNameVariations;
};
export type ContributorRole<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    id: string;
    name?: string;
    description: string;
    profileOnly?: boolean;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
    en: ContributorRoleLocalized;
} & Omit<Partial<{
    [key in SupportedLanguageCodeType]: ContributorRoleLocalized;
}>, 'en'>;
export type ContributorStrings<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    lang: SupportedLanguageCodeType;
    bio: string;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
};
export {};
//# sourceMappingURL=contributors.d.ts.map