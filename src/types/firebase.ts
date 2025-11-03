export enum FirestoreCollection {
  ACTIVITY_LOGS = 'activity-logs',
  CATEGORIES = 'categories',
  CONTRIBUTOR_STRINGS = 'strings', // sub-collection of contributors
  CONTRIBUTORS = 'contributors',
  DOCS = 'docs',
  DONOR_NOTES = 'donor-notes',
  DYNAMIC_PANELS = 'dynamicPanels',
  EXTRAS = 'extras',
  FILES = 'files',
  FOLDER_CONDITIONS = 'folderConditions', // sub-collection of folders
  FOLDER_REDIRECTS = 'folderRedirects',
  FOLDERS = 'folders',
  FOLDER_THUMBS = 'folder-thumbs',
  FOLDER_GROUPS = 'folder-groups',
  ITEM_GROUPS = 'item-groups',
  ITEM_REDIRECTS = 'itemRedirects',
  NEWS = 'news',
  METADATA = 'metadata', // sub-collection of docs
  PAYPAL_TRANSACTIONS = 'paypal-transactions',
  QUOTES = 'quotes',
  REMOVALS = 'removals',
  RETREATS = 'retreats',
  ROLES = 'roles',
  SCHEDULED_QUOTES = 'scheduledQuotes',
  SETTINGS = 'settings',
  SHORT_LINKS = 'shortLinks',
  STRIPE_CHARGES = 'stripe-charges',
  SUBTITLES = 'subtitles', // sub-collection of docs
  TOPICS = 'topics',
  TOPICS_POTENTIAL = 'topics-potential',
  TRANSIENTS = 'transients',
  UPDATES = 'updates',
  USERS = 'users',
  USER_ACTIVITIES = 'activities', // sub-collection of users
  USER_FAVORITES = 'favorites', // sub-collection of users
  USER_PLAYLISTS = 'playlists', // sub-collection of users
  USER_SETTINGS = 'settings', // sub-collection of users
  VIDEOS = 'videos',
}

export const firestoreCollectionDocs = {
  docs: {
    metadata: {
      metadata: 'metadata',
    },
  },
  dynamicPanels: {
    tabs: 'tabs',
  },
  folderThumbs: {
    folderThumbs: 'folder-thumbs',
  },
  removals: {
    removals: 'removals',
  },
  settings: {
    settings: 'settings',
  },
  transients: {
    authors: 'authors',
    docSlugs: 'doc-slugs',
    folderSlugs: 'folder-slugs',
  },
  updates: {
    updates: 'updates',
  },
  users: {
    favorites: {
      favorites: 'favorites',
    },
    settings: {
      app: 'app',
    }
  }
};
