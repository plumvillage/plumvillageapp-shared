import { tabOptions } from './common';

export type Tab = keyof typeof tabOptions;

export type Position = 'one' | 'two' | 'three' | 'four' | 'five';

export type PanelDetail = {
  src?: string;
  enabled: boolean;
}

export type PanelDetailByLanguage<SupportedLanguageCodeType extends string | number | symbol> = {
  [key in SupportedLanguageCodeType]?: PanelDetail;
};

export type Panel<T extends string | number | symbol, TimestampLike = unknown> = {
  key: number;
  position: Position;
  enabled: boolean;
  startDate: TimestampLike;
  endDate: TimestampLike;
  src?: string;
} & PanelDetailByLanguage<T>

export type DynamicPanelsByLanguage<T extends string | number | symbol> = {
  [key in Tab]?: Panel<T>[];
};

export type PanelsByTab<T extends string | number | symbol, FieldValueLike = unknown> = DynamicPanelsByLanguage<T> & {
  updatedTimestamp?: FieldValueLike
}