export type SubtitleVideo<TimestampLike = unknown> = {
  id: string;
  title: string;
  youtubeId?: string;
  internalVideoId?: string;
  amaraVideoId?: string;
  amaraMigrated?: boolean;
  youtubeChannelId?: string;
  languages: string[];  // derived — updated via arrayUnion when a new language version is written
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

export type YouTubeChannel = {
  id: string;          // Firestore doc ID — same as YouTube channel ID e.g. "UCytzR1tkUYoF5DjGYiYkhGQ"
  name: string;        // Display name e.g. "Plum Village App"
  handle: string;      // YouTube handle e.g. "@plumvillageapp"
  youtubeUrl: string;  // e.g. "https://www.youtube.com/@plumvillageapp"
  type?: 'main' | 'shorts'; // e.g. "UUytzR1tkUYoF5DjGYiYkhGQ" is shorts variant of "UCytzR1tkUYoF5DjGYiYkhGQ"
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
