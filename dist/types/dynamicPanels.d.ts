import { tabOptions } from './common';
export type Tab = keyof typeof tabOptions;
export type Position = 'one' | 'two' | 'three' | 'four' | 'five';
export type PanelDetail = {
    src?: string;
    enabled: boolean;
};
export type PanelDetailByLanguage<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in SupportedLanguageCodeType]?: PanelDetail;
};
export type Panel<SupportedLanguageCodeType extends string | number | symbol, TimestampLike = unknown> = {
    key: number;
    position: Position;
    enabled: boolean;
    startDate: TimestampLike;
    endDate: TimestampLike;
    src?: string;
} & PanelDetailByLanguage<SupportedLanguageCodeType>;
export type DynamicPanelsByLanguage<SupportedLanguageCodeType extends string | number | symbol> = {
    [key in Tab]?: Panel<SupportedLanguageCodeType>[];
};
export type PanelsByTab<SupportedLanguageCodeType extends string | number | symbol, FieldValueLike = unknown> = DynamicPanelsByLanguage<SupportedLanguageCodeType> & {
    updatedTimestamp?: FieldValueLike;
};
//# sourceMappingURL=dynamicPanels.d.ts.map