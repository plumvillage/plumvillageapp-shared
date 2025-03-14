
import { FieldValue, Timestamp } from '@firebase/firestore';
import { SupportedLanguageCode, tabOptions } from './common';

export type Tab = keyof typeof tabOptions;

export type Position = 'one' | 'two' | 'three' | 'four' | 'five';

export type TabPanelPosition = {
  [key in Tab]: Position[];
}

/** 
 * This array, corresponding to the tabs, should list the positions where we want to support panels for each tab. 
 * To support additional panels in the future, simply add them to the relevant array here. 
 */
export const availablePositionsByTab: TabPanelPosition = {
  home: ['one', 'two', 'three', 'four', 'five'],
  meditations: [],
  resources: [],
  talks: [],
}

export type PanelDetail = {
  src?: string;
  enabled: boolean;
}

export type PanelDetailByLanguage = {
  [key in SupportedLanguageCode]?: PanelDetail;
};

export type Panel = {
  key: number;
  position: Position;
  enabled: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
  src?: string;
} & PanelDetailByLanguage

export type DynamicPanelsByLanguage = {
  [key in Tab]?: Panel[];
};

export type PanelsByTab = DynamicPanelsByLanguage & {
  updatedTimestamp?: FieldValue
}