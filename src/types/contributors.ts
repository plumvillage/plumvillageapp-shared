export type FeaturedContributor = {
  id: string, // refers to ID from 'contributors' collection
  roleIds: string[], // refers to ID from 'roles' collection
}

type ContributorReservedKeys = 'id' | 'slug' | 'website' | 'profileRoleIds' | 'defaultDocumentRoleIds' | 'roleVariationPreference' | 'createdAt' | 'updatedAt';

type ContributorBase<SupportedLanguageCodeType extends string | number | symbol> = {
  [key in Exclude<SupportedLanguageCodeType, ContributorReservedKeys>]?: string;
};

export type ContributorRoleVariationKey = 'm' | 'f' | 'nb' | 'other';

export type Contributor<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
  en: string;
  id: string;
  slug: string;
  website?: string; // Website URL
  profileRoleIds?: string[];
  defaultDocumentRoleIds?: string[];
  roleVariationPreference?: ContributorRoleVariationKey;
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
} & ContributorBase<SupportedLanguageCodeType>;

export type ContributorRoleNameVariations = Partial<{ [key in ContributorRoleVariationKey]: string }>;

type ContributorRoleLocalized = {
  name: string,
  variations?: ContributorRoleNameVariations,
};

export type ContributorRole<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
  id: string,
  // Transitional: top-level English name. Will be migrated per-role via the admin app
  // into the localized sub-objects below.
  name?: string,
  description: string,
  profileOnly?: boolean,
  createdAt: TimestampLike,
  updatedAt: TimestampLike,
  en: ContributorRoleLocalized,
} & Omit<Partial<{ [key in SupportedLanguageCodeType]: ContributorRoleLocalized }>, 'en'>;

export type ContributorStrings<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
  // The language code is the document ID, but we must store it in the document as well.
  // This is because Firestore does not allow collectionGroup query with a document ID condition.
  // See https://stackoverflow.com/a/58104104/174979
  lang: SupportedLanguageCodeType,
  bio: string,
  createdAt: TimestampLike,
  updatedAt: TimestampLike,
};
