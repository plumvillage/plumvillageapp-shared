// BunnyCDN storage zones (upload/origin) and their matching pull zones (CDN host).

export const AUDIO_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-audio/';
export const HLS_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-hls/';
export const IMAGE_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-item-images/';
export const CONTRIBUTOR_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-contributor-images/';
export const FOLDER_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-folder-images/';
export const ART_STORAGE_ZONE = 'https://storage.bunnycdn.com/pvapp-art/';
export const GENERAL_ZONE = 'https://storage.bunnycdn.com/pvapp/';

const AUDIO_PULL_ZONE = 'https://pvappaudio.b-cdn.net/';
const HLS_PULL_ZONE = 'https://pvapphls.b-cdn.net/';
export const IMAGE_PULL_ZONE = 'https://pvappitemimages.b-cdn.net/';
export const CONTRIBUTOR_PULL_ZONE = 'https://pvappcontributorimages.b-cdn.net/';
export const FOLDER_PULL_ZONE = 'https://pvapp-folder-images.b-cdn.net/';
export const ART_PULL_ZONE = 'https://pvapp-art.b-cdn.net/';
export const GENERAL_PULL_ZONE = 'https://pvapp.b-cdn.net/';

export const PULL_ZONES_MAP = {
  [AUDIO_STORAGE_ZONE]: AUDIO_PULL_ZONE,
  [HLS_STORAGE_ZONE]: HLS_PULL_ZONE,
  [IMAGE_STORAGE_ZONE]: IMAGE_PULL_ZONE,
  [CONTRIBUTOR_STORAGE_ZONE]: CONTRIBUTOR_PULL_ZONE,
  [FOLDER_STORAGE_ZONE]: FOLDER_PULL_ZONE,
  [ART_STORAGE_ZONE]: ART_PULL_ZONE,
  [GENERAL_ZONE]: GENERAL_PULL_ZONE,
};

export type BunnyStorageZone = keyof typeof PULL_ZONES_MAP;
