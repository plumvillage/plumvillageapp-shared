export var FirestoreCollection;
(function (FirestoreCollection) {
    FirestoreCollection["ACTIVITY_LOGS"] = "activity-logs";
    FirestoreCollection["CATEGORIES"] = "categories";
    FirestoreCollection["CONTRIBUTOR_STRINGS"] = "strings";
    FirestoreCollection["CONTRIBUTORS"] = "contributors";
    FirestoreCollection["DOCS"] = "docs";
    FirestoreCollection["DYNAMIC_PANELS"] = "dynamicPanels";
    FirestoreCollection["EXTRAS"] = "extras";
    FirestoreCollection["FILES"] = "files";
    FirestoreCollection["FOLDERS"] = "folders";
    FirestoreCollection["FOLDER_THUMBS"] = "folder-thumbs";
    FirestoreCollection["NEWS"] = "news";
    FirestoreCollection["METADATA"] = "metadata";
    FirestoreCollection["QUOTES"] = "quotes";
    FirestoreCollection["REMOVALS"] = "removals";
    FirestoreCollection["RETREATS"] = "retreats";
    FirestoreCollection["ROLES"] = "roles";
    FirestoreCollection["SCHEDULED_QUOTES"] = "scheduledQuotes";
    FirestoreCollection["SUBTITLES"] = "subtitles";
    FirestoreCollection["TOPICS"] = "topics";
    FirestoreCollection["TOPICS_POTENTIAL"] = "topics-potential";
    FirestoreCollection["TRANSIENTS"] = "transients";
    FirestoreCollection["UPDATES"] = "updates";
    FirestoreCollection["USERS"] = "users";
    FirestoreCollection["USER_ACTIVITIES"] = "activities";
    FirestoreCollection["USER_FAVORITES"] = "favorites";
    FirestoreCollection["USER_PLAYLISTS"] = "playlists";
    FirestoreCollection["USER_SETTINGS"] = "settings";
    FirestoreCollection["VIDEOS"] = "videos";
})(FirestoreCollection || (FirestoreCollection = {}));
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
