export type MetadataType <SupportedLanguageCodeType extends string | number | symbol, FieldValueLike = unknown> = {
  id: string,
  slug: string,
  updatedAt?: FieldValueLike,
  lastUpdatedBy?: 'ADMIN' | 'BATCH',
  en: { singular: string, plural?: string}
} & Omit<Partial<{ [key in SupportedLanguageCodeType] : {singular: string, plural?: string} }>, 'en'>;