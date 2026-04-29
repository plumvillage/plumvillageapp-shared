export type SubtitleVideo<TimestampLike = unknown> = {
  id: string;
  title: string;
  youtubeId?: string;
  internalVideoId?: string;
  amaraVideoId?: string;
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
  authorUid: string | null;       // Firebase UID — set for our own users
  amaraAuthorId: string | null;   // Amara user ID — set for migrated contributions
  versionNumber: number;
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
  approvedAt: TimestampLike | null;
  approvedBy: string | null;
  ytCaptionId: string | null;
  editLock: { uid: string; email: string; lockedAt: TimestampLike } | null;
};

export type AmaraUser = {
  amaraId: string;
  username: string;
  fullName: string;
  matchedFirebaseUid: string | null;
  [key: string]: unknown; // raw Amara API fields stored verbatim
};

export type SubtitlerApplication<TimestampLike = unknown> = {
  email: string;
  name: string;
  languages: string[];
  notes: string;
  submittedAt: TimestampLike;
  claimGrantedAt: TimestampLike | null;
};
