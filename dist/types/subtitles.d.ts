export type SubtitleVideo<TimestampLike = unknown> = {
    id: string;
    title: string;
    youtubeId?: string;
    internalVideoId?: string;
    createdAt: TimestampLike;
    addedBy: string | null;
};
export type SubtitleVersionStatus = 'draft' | 'finished' | 'approved';
export type SubtitleVersionSource = 'migration' | 'youtube' | 'editor';
export type SubtitleVersion<TimestampLike = unknown> = {
    id: string;
    language: string;
    vttContent: string;
    status: SubtitleVersionStatus;
    source: SubtitleVersionSource;
    authorUid: string | null;
    authorEmail: string | null;
    versionNumber: number;
    createdAt: TimestampLike;
    updatedAt: TimestampLike;
    approvedAt: TimestampLike | null;
    approvedBy: string | null;
    ytCaptionId: string | null;
    editLock: {
        uid: string;
        email: string;
        lockedAt: TimestampLike;
    } | null;
};
export type SubtitlerApplication<TimestampLike = unknown> = {
    email: string;
    name: string;
    languages: string[];
    notes: string;
    submittedAt: TimestampLike;
    claimGrantedAt: TimestampLike | null;
};
//# sourceMappingURL=subtitles.d.ts.map