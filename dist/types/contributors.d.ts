export type FeaturedContributor = {
    id: string;
    roleIds: string[];
};
type ContributorReservedKeys = 'id' | 'slug' | 'website' | 'profileRoleIds' | 'defaultDocumentRoleIds' | 'createdAt' | 'updatedAt';
type ContributorBase<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in Exclude<SupportedLanguageCodeType, ContributorReservedKeys>]?: string;
};
export type Contributor<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    en: string;
    id: string;
    slug: string;
    website?: string;
    profileRoleIds?: string[];
    defaultDocumentRoleIds?: string[];
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
} & ContributorBase<SupportedLanguageCodeType>;
export type ContributorRole<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    id: string;
    name?: string;
    description: string;
    profileOnly?: boolean;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
    en: {
        name: string;
    };
} & Omit<Partial<{
    [key in SupportedLanguageCodeType]: {
        name: string;
    };
}>, 'en'>;
export type ContributorStrings<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    lang: SupportedLanguageCodeType;
    bio: string;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
};
export {};
//# sourceMappingURL=contributors.d.ts.map