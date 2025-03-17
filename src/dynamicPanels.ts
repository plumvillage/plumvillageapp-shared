import { SupportedLanguageCode, tabOptions } from './common';

export type Tab = keyof typeof tabOptions;

export type Position = 'one' | 'two' | 'three' | 'four' | 'five';

export type PanelDetail = {
  src?: string;
  enabled: boolean;
}

export type PanelDetailByLanguage = {
  [key in SupportedLanguageCode]?: PanelDetail;
};

export type TimestampLike = unknown;

export type Panel = {
  key: number;
  position: Position;
  enabled: boolean;
  startDate: TimestampLike;
  endDate: TimestampLike;
  src?: string;
} & PanelDetailByLanguage

export type DynamicPanelsByLanguage = {
  [key in Tab]?: Panel[];
};

export type FieldValueLike = unknown;

export type PanelsByTab = DynamicPanelsByLanguage & {
  updatedTimestamp?: FieldValueLike
}