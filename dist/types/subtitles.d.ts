export type SubtitleVideo<TimestampLike = unknown> = {
    id: string;
    title: string;
    youtubeId?: string;
    internalVideoId?: string;
    amaraVideoId?: string;
    amaraMigrated?: boolean;
    youtubeChannelId?: string;
    languages: string[];
    createdAt: TimestampLike;
    addedBy: string | null;
};
export type SubtitleVersionStatus = 'draft' | 'finished' | 'review' | 'approved';
export type SubtitleVersionSource = 'migration' | 'youtube' | 'editor';
export type SubtitleVersion<TimestampLike = unknown> = {
    id: string;
    language: string;
    vttContent: string;
    status: SubtitleVersionStatus;
    source: SubtitleVersionSource;
    authorUid: string | null;
    amaraAuthorId: string | null;
    versionNumber: number;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
    approvedAt: TimestampLike | null;
    approvedBy: string | null;
    editLock: {
        uid: string;
        lockedAt: TimestampLike;
    } | null;
};
export type YouTubeChannel = {
    id: string;
    name: string;
    handle: string;
    youtubeUrl: string;
};
export type AmaraUser = {
    amaraId: string;
    username: string;
    fullName: string;
    matchedFirebaseUid: string | null;
    [key: string]: unknown;
};
export type Subtitler<TimestampLike = unknown> = {
    uid: string;
    displayName: string;
    languages: string[];
    joinedAt: TimestampLike;
};
export type SubtitlerApplication<TimestampLike = unknown> = {
    email: string;
    name: string;
    displayName: string;
    languages: string[];
    notes: string;
    submittedAt: TimestampLike;
    claimGrantedAt: TimestampLike | null;
};
//# sourceMappingURL=subtitles.d.ts.map