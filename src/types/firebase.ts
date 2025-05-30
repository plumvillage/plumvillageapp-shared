export enum FirestoreCollection {
  CATEGORIES = 'categories',
  CONTRIBUTOR_STRINGS = 'strings', // sub-collection of contributors
  CONTRIBUTORS = 'contributors',
  DOCS = 'docs',
  DYNAMIC_PANELS = 'dynamicPanels',
  FOLDERS = 'folders',
  METADATA = 'metadata',
  QUOTES = 'quotes',
  ROLES = 'roles',
  SCHEDULED_QUOTES = 'scheduledQuotes',
  SUBTITLES = 'subtitles',
  TOPICS = 'topics',
  TOPICS_POTENTIAL = 'topics-potential',
  TRANSIENTS = 'transients',
}

export const firestoreCollectionDocs = {
  dynamicPanels: {
    tabs: 'tabs',
  }
};