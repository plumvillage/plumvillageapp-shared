export declare enum FirestoreCollection {
    ACTIVITY_LOGS = "activity-logs",
    CATEGORIES = "categories",
    CONTRIBUTOR_STRINGS = "strings",// sub-collection of contributors
    CONTRIBUTORS = "contributors",
    DOCS = "docs",
    DYNAMIC_PANELS = "dynamicPanels",
    EXTRAS = "extras",
    FILES = "files",
    FOLDERS = "folders",
    FOLDER_THUMBS = "folder-thumbs",
    FOLDER_GROUPS = "folder-groups",
    ITEM_GROUPS = "item-groups",
    NEWS = "news",
    METADATA = "metadata",// sub-collection of docs
    QUOTES = "quotes",
    REMOVALS = "removals",
    RETREATS = "retreats",
    ROLES = "roles",
    SCHEDULED_QUOTES = "scheduledQuotes",
    SUBTITLES = "subtitles",// sub-collection of docs
    TOPICS = "topics",
    TOPICS_POTENTIAL = "topics-potential",
    TRANSIENTS = "transients",
    UPDATES = "updates",
    USERS = "users",
    USER_ACTIVITIES = "activities",// sub-collection of users
    USER_FAVORITES = "favorites",// sub-collection of users
    USER_PLAYLISTS = "playlists",// sub-collection of users
    USER_SETTINGS = "settings",// sub-collection of users
    VIDEOS = "videos"
}
export declare const firestoreCollectionDocs: {
    dynamicPanels: {
        tabs: string;
    };
    folderThumbs: {
        folderThumbs: string;
    };
    removals: {
        removals: string;
    };
    settings: {
        settings: string;
    };
    updates: {
        updates: string;
    };
    users: {
        favorites: {
            favorites: string;
        };
        settings: {
            app: string;
        };
    };
};
//# sourceMappingURL=firebase.d.ts.map