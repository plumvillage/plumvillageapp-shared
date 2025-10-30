export type FeaturedContributor = {
    id: string;
    roleIds: string[];
};
type ContributorReservedKeys = 'id' | 'slug' | 'website' | 'createdAt' | 'updatedAt';
type ContributorBase<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in Exclude<SupportedLanguageCodeType, ContributorReservedKeys>]?: string;
};
export type Contributor<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    en: string;
    id: string;
    slug: string;
    website?: string;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
} & ContributorBase<SupportedLanguageCodeType>;
export type ContributorRole<TimestampLike = unknown> = {
    id: string;
    name: string;
    description: string;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
};
export type ContributorStrings<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    lang: SupportedLanguageCodeType;
    bio: string;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
};
export {};
//# sourceMappingURL=contributors.d.ts.map