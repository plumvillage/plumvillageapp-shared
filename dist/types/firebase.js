"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.firestoreCollectionDocs = exports.FirestoreCollection = void 0;
var FirestoreCollection;
(function (FirestoreCollection) {
    FirestoreCollection["CATEGORIES"] = "categories";
    FirestoreCollection["CONTRIBUTOR_STRINGS"] = "strings";
    FirestoreCollection["CONTRIBUTORS"] = "contributors";
    FirestoreCollection["DOCS"] = "docs";
    FirestoreCollection["DYNAMIC_PANELS"] = "dynamicPanels";
    FirestoreCollection["FOLDERS"] = "folders";
    FirestoreCollection["METADATA"] = "metadata";
    FirestoreCollection["QUOTES"] = "quotes";
    FirestoreCollection["ROLES"] = "roles";
    FirestoreCollection["SCHEDULED_QUOTES"] = "scheduledQuotes";
    FirestoreCollection["SUBTITLES"] = "subtitles";
    FirestoreCollection["TOPICS"] = "topics";
    FirestoreCollection["TOPICS_POTENTIAL"] = "topics-potential";
    FirestoreCollection["TRANSIENTS"] = "transients";
})(FirestoreCollection || (exports.FirestoreCollection = FirestoreCollection = {}));
exports.firestoreCollectionDocs = {
    dynamicPanels: {
        tabs: 'tabs',
    }
};
exports.test = '';
