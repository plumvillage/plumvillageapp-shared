export enum FirestoreCollection {
  ACTIVITY_LOGS = 'activity-logs',
  CATEGORIES = 'categories',
  CONTRIBUTOR_STRINGS = 'strings', // sub-collection of contributors
  CONTRIBUTORS = 'contributors',
  DOCS = 'docs',
  DYNAMIC_PANELS = 'dynamicPanels',
  EXTRAS = 'extras',
  FILES = 'files',
  FOLDERS = 'folders',
  FOLDER_THUMBS = 'folder-thumbs',
  FOLDER_GROUPS = 'folder-groups',
  ITEM_GROUPS = 'item-groups',
  NEWS = 'news',
  METADATA = 'metadata', // sub-collection of docs
  QUOTES = 'quotes',
  REMOVALS = 'removals',
  RETREATS = 'retreats',
  ROLES = 'roles',
  SCHEDULED_QUOTES = 'scheduledQuotes',
  SHORT_LINKS = 'shortLinks',
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
