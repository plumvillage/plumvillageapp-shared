import { SupportedLanguageCode, tabOptions } from './common';
export type Tab = keyof typeof tabOptions;
export type Position = 'one' | 'two' | 'three' | 'four' | 'five';
export type PanelDetail = {
    src?: string;
    enabled: boolean;
};
export type PanelDetailByLanguage = {
    [key in SupportedLanguageCode]?: PanelDetail;
};
export type Panel<TimestampLike = unknown> = {
    key: number;
    position: Position;
    enabled: boolean;
    startDate: TimestampLike;
    endDate: TimestampLike;
    src?: string;
} & PanelDetailByLanguage;
export type DynamicPanelsByLanguage = {
    [key in Tab]?: Panel[];
};
export type PanelsByTab<FieldValueLike = undefined> = DynamicPanelsByLanguage & {
    updatedTimestamp?: FieldValueLike;
};
//# sourceMappingURL=dynamicPanels.d.ts.map