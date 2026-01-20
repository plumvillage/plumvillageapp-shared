export var FirestoreCollection;
(function (FirestoreCollection) {
    FirestoreCollection["ACTIVITY_LOGS"] = "activity-logs";
    FirestoreCollection["CATEGORIES"] = "categories";
    FirestoreCollection["CONTRIBUTOR_STRINGS"] = "strings";
    FirestoreCollection["CONTRIBUTORS"] = "contributors";
    FirestoreCollection["DOCS"] = "docs";
    FirestoreCollection["DONOR_NOTES"] = "donor-notes";
    FirestoreCollection["DYNAMIC_PANELS"] = "dynamicPanels";
    FirestoreCollection["EXTRAS"] = "extras";
    FirestoreCollection["FILES"] = "files";
    FirestoreCollection["FUNDRAISERS"] = "fundraisers";
    FirestoreCollection["FOLDER_CONDITIONS"] = "folderConditions";
    FirestoreCollection["FOLDER_REDIRECTS"] = "folderRedirects";
    FirestoreCollection["FOLDERS"] = "folders";
    FirestoreCollection["FOLDER_THUMBS"] = "folder-thumbs";
    FirestoreCollection["FOLDER_GROUPS"] = "folder-groups";
    FirestoreCollection["ITEM_GROUPS"] = "item-groups";
    FirestoreCollection["ITEM_REDIRECTS"] = "itemRedirects";
    FirestoreCollection["NEWS"] = "news";
    FirestoreCollection["METADATA"] = "metadata";
    FirestoreCollection["PAYPAL_TRANSACTIONS"] = "paypal-transactions";
    FirestoreCollection["PAYPAL_THANKED"] = "paypal-thanked";
    FirestoreCollection["QUOTES"] = "quotes";
    FirestoreCollection["REMOVALS"] = "removals";
    FirestoreCollection["RETREATS"] = "retreats";
    FirestoreCollection["ROLES"] = "roles";
    FirestoreCollection["SCHEDULED_QUOTES"] = "scheduledQuotes";
    FirestoreCollection["SETTINGS"] = "settings";
    FirestoreCollection["SHORT_LINKS"] = "shortLinks";
    FirestoreCollection["STRIPE_CHARGES"] = "stripe-charges";
    FirestoreCollection["STRIPE_THANKED"] = "stripe-thanked";
    FirestoreCollection["SUBTITLES"] = "subtitles";
    FirestoreCollection["TEXTTRACKS"] = "texttracks";
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
