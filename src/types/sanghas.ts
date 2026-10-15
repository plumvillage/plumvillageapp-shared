// The response of our API's GET /sanghas: Plumline's Sangha Directory API v1, republished with only
// the sangha properties below. Transcribed from Plumline's docs and OpenAPI spec. Comments marked
// "In practice" describe the live data (October 2026), when every sangha used a 'text' schedule,
// not a documented guarantee.
// Docs: https://new.plumline.org/developers/api/
// OpenAPI spec: https://new.plumline.org/developers/api/openapi-v1.yaml

/** An ordinal within the month: 1 is the first, -1 the last. */
export type SanghaSetPosition = -1 | 1 | 2 | 3 | 4 | 5;

/** An RRULE-style rule (RFC 5545), lowercased. Skipped dates are not supported. */
export type SanghaRecurrenceRule = {
  freq: 'daily' | 'weekly' | 'monthly' | 'yearly',
  /** Every nth `freq`, e.g. 2 with 'weekly' is fortnightly. 1 to 100. */
  interval: number,
  /** First occurrence as local wall-clock time, YYYY-MM-DDTHH:mm with no offset. Interpret it in `tzid`. */
  dtstart: string,
  /** IANA timezone, e.g. 'Europe/London'. Daylight saving follows it. */
  tzid: string,
  byweekday?: Array<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'>,
  bymonthday?: number,
  /** With monthly rules, which of the month's `byweekday` matches: 1 with 'su' is the first Sunday. */
  bysetpos?: SanghaSetPosition | SanghaSetPosition[],
  bymonth?: number,
  /** Total number of occurrences. */
  count?: number,
  /** Last possible occurrence (inclusive), local wall-clock time like `dtstart`. */
  until?: string,
};

/**
 * One regular meeting. For a 'text' schedule these fields are partially parsed hints, not a
 * calculable schedule; show Sangha.meetingDescription instead.
 */
export type SanghaMeeting = {
  /** Local wall-clock start, YYYY-MM-DDTHH:mm, in `timezone`. In practice null for 'text' schedules. */
  startTime: string | null,
  /** In practice a three-letter English abbreviation, 'Mon' to 'Sun'. */
  day: string | null,
  /** In practice 24-hour 'HH:mm', in `timezone`. */
  time: string | null,
  /** IANA timezone, e.g. 'America/New_York'. */
  timezone: string | null,
  durationMinutes: number | null,
  /** Free text, e.g. 'weekly', 'fortnightly', 'monthly, 2nd Sunday'. Not an enum. */
  frequency: string | null,
  /** Legacy spreadsheet recurrence text. Structured schedules use `recurrenceRule` instead. */
  recurrence: string | null,
  /** Null unless the sangha's meetingScheduleMode is 'structured'. */
  recurrenceRule: SanghaRecurrenceRule | null,
  /** Human-readable rule, e.g. 'Every Sunday'. In practice null for 'text' schedules. */
  recurrenceSummary: string | null,
  /** Free text, e.g. 'online', 'hybrid'. */
  format: string | null,
  /** Free text for display. Use Sangha.languages for filtering. */
  language: string | null,
  description: string | null,
};

export type Sangha = {
  /** Opaque identifier. Use this, not `slug`, as the key. */
  id: string,
  /** Plumline's URL slug. May contain non-Latin characters. */
  slug: string | null,
  /** The sangha's page on plumline.org. */
  url: string | null,
  name: string,
  /** Location fields are often null for online sanghas, which may have no location. */
  country: string | null,
  state: string | null,
  address: string | null,
  latitude: number | null,
  longitude: number | null,
  /** The sangha's own website. */
  website: string | null,
  description: string | null,
  /** The supporting organisation. In practice a domain ('plumline.org') or a URL ('https://intersein.de'). */
  supportedBy: string | null,
  /** Lowercase BCP 47 primary language tags, e.g. 'en', 'de'. Every language the sangha uses. */
  languages: string[],
  /**
   * Affinity groups, e.g. 'Wake Up'. Display labels, not IDs, so may change or near-duplicate
   * (e.g. 'LGBTQ+', 'Rainbow Family - LGBTQ+'). Don't key on them.
   */
  affinities: string[],
  /** Display labels; a sangha may have several. In practice 'local sangha', 'online sangha' or 'monastic practice centre'. */
  types: string[],
  /**
   * 'structured': occurrences can be calculated from `meetings[].recurrenceRule`.
   * 'text': `meetingDescription` is authoritative; show it.
   */
  meetingScheduleMode: 'structured' | 'text',
  /** Zero or more, in weekday-and-time order. Each structured meeting is its own item, never merged with others. */
  meetings: SanghaMeeting[],
  /** Human-readable schedule, possibly multi-line. For text schedules the IANA timezone is appended in parentheses when set. */
  meetingDescription: string,
  /** Whether the Plumline site (`url`) can relay an introduction without exposing an email address. */
  canReceiveIntro: boolean,
};

export type SanghaDirectory = {
  apiVersion: 'v1',
  count: number,
  sanghas: Sangha[],
};
