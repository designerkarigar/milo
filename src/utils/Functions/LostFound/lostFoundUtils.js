import { resolveS3UrlForDisplay, parseAwsS3HttpUrlToObjectKey } from "../Others/resolveS3Url";

function firstNonEmptyTrimmed(values) {
  for (const v of values) {
    const s = String(v ?? "").trim();
    if (s) return s;
  }
  return "";
}

/**
 * Normalizes reporter contact fields from GET /lostAndFound records
 * (camelCase vs snake_case vs nested reporter/user).
 */
export function pickReporterContactFields(record) {
  if (!record || typeof record !== "object") {
    return { contactDetails: "", userName: "" };
  }
  const reporter = record.reporter && typeof record.reporter === "object" ? record.reporter : null;
  const user = record.user && typeof record.user === "object" ? record.user : null;

  const contactDetails = firstNonEmptyTrimmed([
    record.contactDetails,
    record.contact_details,
    record.contact_detail,
    record.contact,
    record.phone,
    record.phoneNumber,
    record.phone_no,
    record.mobile,
    record.mobileNumber,
    record.reporterPhone,
    record.reporterContact,
    reporter?.contactDetails,
    reporter?.contact_details,
    reporter?.phone,
    reporter?.mobile,
    user?.contactDetails,
    user?.phone,
    user?.mobile,
  ]);

  const userName = firstNonEmptyTrimmed([
    record.userName,
    record.user_name,
    record.username,
    record.reportedBy,
    record.reportedByUserName,
    record.createdBy,
    record.created_by,
    reporter?.userName,
    reporter?.user_name,
    reporter?.email,
    user?.userName,
    user?.user_name,
    user?.email,
  ]);

  return { contactDetails, userName };
}

function readExplicitBool(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;
  for (const k of keys) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    const v = obj[k];
    if (v === true || v === false) return v;
    if (v === "true" || v === "false") return v === "true";
    if (v === 1 || v === 0) return Boolean(v);
  }
  return undefined;
}

/**
 * Whether phone / email may be shown in the contact popup.
 * When the API omits flags (legacy rows), both default to true.
 */
export function pickReporterContactPrivacy(record) {
  const sources = [
    record,
    record?.reporter && typeof record.reporter === "object" ? record.reporter : null,
    record?.user && typeof record.user === "object" ? record.user : null,
  ].filter(Boolean);

  const phoneKeys = [
    "phoneContactAllowed",
    "phone_contact_allowed",
    "allowPhoneContact",
    "phoneAllowed",
    "sharePhone",
  ];
  const emailKeys = [
    "emailContactAllowed",
    "email_contact_allowed",
    "allowEmailContact",
    "emailAllowed",
    "shareEmail",
  ];

  let phoneAllowed;
  let emailAllowed;
  for (const src of sources) {
    if (phoneAllowed === undefined) {
      const v = readExplicitBool(src, phoneKeys);
      if (v !== undefined) phoneAllowed = v;
    }
    if (emailAllowed === undefined) {
      const v = readExplicitBool(src, emailKeys);
      if (v !== undefined) emailAllowed = v;
    }
  }

  return {
    phoneContactAllowed: phoneAllowed !== false,
    emailContactAllowed: emailAllowed !== false,
  };
}

function normalizeTelDigits(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 7 ? digits : null;
}

function isEmailLike(value) {
  const s = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Values safe to render/copy in the contact popup after applying privacy flags. */
export function pickVisibleReporterContact(report) {
  const { contactDetails, userName } = pickReporterContactFields(report);
  const { phoneContactAllowed, emailContactAllowed } = pickReporterContactPrivacy(report);

  const contactRaw = String(contactDetails || "").trim();
  const accountRaw = String(userName || "").trim();

  const phoneFromContact = normalizeTelDigits(contactRaw);
  const phoneFromAccount = normalizeTelDigits(accountRaw);

  let phoneDisplay = "";
  if (phoneContactAllowed) {
    if (phoneFromContact) phoneDisplay = contactRaw;
    else if (phoneFromAccount) phoneDisplay = accountRaw;
  }

  const emailFromContact = isEmailLike(contactRaw) ? contactRaw : "";
  const emailFromAccount = isEmailLike(accountRaw) ? accountRaw : "";

  let emailDisplay = "";
  if (emailContactAllowed) {
    emailDisplay = emailFromContact || emailFromAccount || "";
  }

  // Many list rows store a phone or email only in `contactDetails` while the API defaults both
  // share flags to false. If strict privacy hides everything but `contactDetails` clearly holds
  // reach-out info, treat that field as intentional share for matching channel(s).
  if (!phoneDisplay.trim() && !emailDisplay.trim() && contactRaw) {
    const bothFlagsOff = phoneContactAllowed === false && emailContactAllowed === false;
    if (bothFlagsOff) {
      if (isEmailLike(contactRaw)) {
        emailDisplay = contactRaw;
      } else if (phoneFromContact) {
        phoneDisplay = contactRaw;
      }
    }
  }

  return {
    phoneDisplay: phoneDisplay.trim(),
    emailDisplay: emailDisplay.trim(),
    phoneContactAllowed,
    emailContactAllowed,
  };
}

export function hasVisibleReporterContact(report) {
  const { phoneDisplay, emailDisplay } = pickVisibleReporterContact(report);
  return Boolean(phoneDisplay || emailDisplay);
}

function tryIdTokenPayload() {
  const idToken = typeof localStorage !== "undefined" ? localStorage.getItem("idToken") : null;
  if (!idToken || idToken === "0") return null;
  const parts = idToken.split(".");
  if (parts.length < 2) return null;
  try {
    return JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function pushLower(set, value) {
  const s = String(value ?? "").trim().toLowerCase();
  if (s) set.add(s);
}

/** Identifiers the backend may store on a report as “who filed this”. */
function collectReportOwnerCandidates(record) {
  const set = new Set();
  if (!record || typeof record !== "object") return set;
  const reporter = record.reporter && typeof record.reporter === "object" ? record.reporter : null;
  const user = record.user && typeof record.user === "object" ? record.user : null;

  const { userName, contactDetails } = pickReporterContactFields(record);
  pushLower(set, userName);
  if (contactDetails && String(contactDetails).includes("@")) {
    pushLower(set, contactDetails);
  }

  [
    record.userId != null ? String(record.userId) : "",
    record.user_id != null ? String(record.user_id) : "",
    record.ownerId,
    record.owner_id,
    record.firebaseUid,
    record.firebase_uid,
    record.sub,
    record.cognitoUsername,
    record.cognito_username,
    reporter?.userName,
    reporter?.email,
    reporter?.sub,
    user?.userName,
    user?.email,
    user?.sub,
  ].forEach((v) => pushLower(set, v));

  return set;
}

/** Identifiers for the current browser session (Firebase + Cognito JWT + stored username). */
function collectCurrentUserCandidates(firebaseUser) {
  const set = new Set();
  pushLower(set, typeof localStorage !== "undefined" ? localStorage.getItem("username") : "");
  pushLower(set, typeof localStorage !== "undefined" ? localStorage.getItem("userName") : "");

  if (firebaseUser && typeof firebaseUser === "object") {
    pushLower(set, firebaseUser.email);
    pushLower(set, firebaseUser.displayName);
    pushLower(set, firebaseUser.uid);
    pushLower(set, firebaseUser.phoneNumber);
  }

  const payload = tryIdTokenPayload();
  if (payload && typeof payload === "object") {
    pushLower(set, payload.email);
    pushLower(set, payload.sub);
    pushLower(set, payload["cognito:username"]);
    pushLower(set, payload.username);
    pushLower(set, payload.preferred_username);
  }

  return set;
}

/**
 * Whether the signed-in user is the person who created this report (pet owner / reporter).
 * Compares many report fields to Firebase user, localStorage username, and Cognito idToken claims.
 */
export function isLostFoundReportOwner(record, firebaseUser) {
  if (!record || typeof record !== "object") return false;
  if (readExplicitBool(record, ["isMine", "is_owner", "viewerIsReporter", "isOwner", "isReporter"]) === true) {
    return true;
  }
  const theirs = collectReportOwnerCandidates(record);
  if (!theirs.size) return false;
  const mine = collectCurrentUserCandidates(firebaseUser);
  if (!mine.size) return false;
  for (const t of theirs) {
    if (mine.has(t)) return true;
  }
  return false;
}

/** Normalize a sighting row from GET /reports/:id/sightings for UI. */
export function normalizeSightingRecord(raw) {
  if (!raw || typeof raw !== "object") return null;
  const loc = raw.location && typeof raw.location === "object" ? raw.location : {};
  const seenAtStr = firstNonEmptyTrimmed([raw.seenAt, raw.seen_at, raw.createdAt, raw.crdt]);
  let seenMs = seenAtStr ? Date.parse(seenAtStr) : NaN;
  if (Number.isNaN(seenMs) && raw.time != null) {
    const t = Number(raw.time);
    if (!Number.isNaN(t)) {
      seenMs = t < 1e12 ? t * 1000 : t;
    }
  }
  const seenAt = Number.isNaN(seenMs) ? seenAtStr || "" : new Date(seenMs).toISOString();

  const lat = pickNumericCoord(loc.lat, loc.latitude, raw.lat);
  const long = pickNumericCoord(loc.long, loc.lng, loc.longitude, raw.long);

  return {
    ...raw,
    seenAt,
    notes: firstNonEmptyTrimmed([raw.notes, raw.note, raw.message]),
    confidence: firstNonEmptyTrimmed([raw.confidence, raw.confidenceLevel]) || "",
    photoUrl: firstNonEmptyTrimmed([raw.photoUrl, raw.photo_url, raw.imageUrl, raw.image]),
    canHelp: readExplicitBool(raw, ["canHelp", "can_help", "willingToHelp"]) !== false,
    location: {
      ...loc,
      address: firstNonEmptyTrimmed([
        loc.address,
        loc.formattedAddress,
        loc.label,
        loc.name,
        loc.description,
        raw.address,
        raw.landmark,
      ]),
      ...(lat !== undefined ? { lat } : {}),
      ...(long !== undefined ? { long } : {}),
    },
  };
}

export function normalizeSightingRecords(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(normalizeSightingRecord).filter(Boolean);
}

/** Single-line place label for “last seen” / map context. */
export function formatLostFoundLastSeenLine(record) {
  const loc = record?.location || {};
  const addr = String(loc.address || "").trim();
  if (addr) return addr;
  const parts = [loc.city, loc.state, loc.country].map((x) => String(x || "").trim()).filter(Boolean);
  if (parts.length) return parts.join(", ");
  return "—";
}

/** Optional sighting count on list rows (when API provides it). */
export function pickLostFoundSightingCount(record) {
  if (!record || typeof record !== "object") return null;
  const raw =
    record.sightingCount ??
    record.sightingsCount ??
    record.sighting_count ??
    record.sightings_count ??
    record.totalSightings ??
    record.total_sightings ??
    record.sightings?.length;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

export function formatSightingClock(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function formatSightingDayHeading(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Short relative label e.g. "12 mins ago" for sighting cards. */
export function formatRelativeShort(isoOrMs) {
  const d = new Date(isoOrMs);
  if (Number.isNaN(d.getTime())) return "";
  const sec = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
  if (sec < 45) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  if (day < 14) return `${day} day${day === 1 ? "" : "s"} ago`;
  return formatSightingDayHeading(isoOrMs);
}

export function formatSightingFullTimestamp(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function pickSightingWitnessLabel(sighting) {
  if (!sighting || typeof sighting !== "object") return "";
  return firstNonEmptyTrimmed([
    sighting.userName,
    sighting.user_name,
    sighting.witnessName,
    sighting.witness_name,
    sighting.reporterName,
  ]);
}

/** Free-text / structured contact the witness may have left on the sighting. */
export function pickWitnessContactFields(sighting) {
  if (!sighting || typeof sighting !== "object") {
    return { contactDetails: "", userName: "" };
  }
  const contactDetails = firstNonEmptyTrimmed([
    sighting.contactDetails,
    sighting.contact_details,
    sighting.witnessContact,
    sighting.witness_contact,
    sighting.phone,
    sighting.mobile,
    sighting.phoneNumber,
    sighting.witnessPhone,
    sighting.email,
    sighting.witnessEmail,
    sighting.contactEmail,
  ]);
  const userName = pickSightingWitnessLabel(sighting);
  return { contactDetails, userName };
}

/**
 * Phone / email sharing for witnesses — opt-in: only `true` flags enable that channel.
 * Also honors a single “share contact” style flag when the API sends one boolean for both.
 */
export function pickWitnessContactPrivacy(sighting) {
  if (!sighting || typeof sighting !== "object") {
    return { phoneContactAllowed: false, emailContactAllowed: false };
  }

  const phoneKeys = [
    "phoneContactAllowed",
    "phone_contact_allowed",
    "allowPhoneContact",
    "phoneAllowed",
    "sharePhone",
    "witnessSharePhone",
    "share_phone",
  ];
  const emailKeys = [
    "emailContactAllowed",
    "email_contact_allowed",
    "allowEmailContact",
    "emailAllowed",
    "shareEmail",
    "witnessShareEmail",
    "share_email",
  ];
  const blanketKeys = ["shareContact", "share_contact", "allowContact", "allow_contact", "contactShared"];

  if (readExplicitBool(sighting, blanketKeys) === true) {
    return { phoneContactAllowed: true, emailContactAllowed: true };
  }

  return {
    phoneContactAllowed: readExplicitBool(sighting, phoneKeys) === true,
    emailContactAllowed: readExplicitBool(sighting, emailKeys) === true,
  };
}

/** Phone / email strings safe to dial or mail after witness privacy (opt-in). */
export function pickVisibleWitnessContact(sighting) {
  const { contactDetails, userName } = pickWitnessContactFields(sighting);
  const { phoneContactAllowed, emailContactAllowed } = pickWitnessContactPrivacy(sighting);

  const contactRaw = String(contactDetails || "").trim();
  const accountRaw = String(userName || "").trim();

  const phoneFromContact = normalizeTelDigits(contactRaw);
  const phoneFromAccount = normalizeTelDigits(accountRaw);

  let phoneDisplay = "";
  if (phoneContactAllowed) {
    if (phoneFromContact) phoneDisplay = contactRaw;
    else if (phoneFromAccount) phoneDisplay = accountRaw;
  }

  const emailFromContact = isEmailLike(contactRaw) ? contactRaw : "";
  const emailFromAccount = isEmailLike(accountRaw) ? accountRaw : "";

  let emailDisplay = "";
  if (emailContactAllowed) {
    emailDisplay = emailFromContact || emailFromAccount || "";
  }

  return {
    phoneDisplay: phoneDisplay.trim(),
    emailDisplay: emailDisplay.trim(),
    phoneContactAllowed,
    emailContactAllowed,
  };
}

export function hasVisibleWitnessContact(sighting) {
  const { phoneDisplay, emailDisplay } = pickVisibleWitnessContact(sighting);
  return Boolean(phoneDisplay || emailDisplay);
}

/** Label for UI when we must not expose an email/phone as a “name”. */
export function pickWitnessDisplayName(sighting) {
  const label = pickSightingWitnessLabel(sighting);
  if (!label) return "";
  const priv = pickWitnessContactPrivacy(sighting);
  if (isEmailLike(label) && !priv.emailContactAllowed) return "Community helper";
  if (normalizeTelDigits(label) && !priv.phoneContactAllowed) return "Community helper";
  return label;
}

export function sightingStableId(sighting, index) {
  if (!sighting || typeof sighting !== "object") return `s-${index}`;
  const id = sighting.uid ?? sighting.id ?? sighting.sightingId ?? sighting._id;
  if (id != null && typeof id === "object" && id.$oid) return String(id.$oid);
  if (id != null) return String(id);
  return `s-${index}-${String(sighting.seenAt || "")}`;
}

function pickNumericCoord(...vals) {
  for (const v of vals) {
    if (v == null || v === "") continue;
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
}

/** Map API status variants to `LOST` | `FOUND` | `REUNITED` so filters match list payloads. */
export function getNormalizedLostFoundStatus(record) {
  if (!record || typeof record !== "object") return "";
  const resolution = String(
    firstNonEmptyTrimmed([
      record.resolutionStatus,
      record.resolution_status,
      record.reportResolution,
      record.report_resolution,
    ])
  ).toUpperCase();

  const raw = firstNonEmptyTrimmed([
    record.status,
    record.reportStatus,
    record.report_status,
    record.lostFoundStatus,
    record.lost_found_status,
  ]);
  const u = String(raw).trim().toUpperCase();

  if (resolution === "REUNITED" || resolution === "RESOLVED" || resolution === "CLOSED") {
    if (u === "LOST" || u === "MISSING" || !u) return "REUNITED";
  }

  if (u === "REUNITED" || u === "REUNITED_PET") return "REUNITED";
  if (u === "FOUND" || u === "FIND" || u === "FOUND_PET") return "FOUND";
  if (u === "LOST" || u === "MISSING") return "LOST";
  if (!u) return "";
  return u;
}

/** Lost report is closed as reunited (not an active missing-pet search). */
export function isLostReportMarkedReunited(record) {
  return getNormalizedLostFoundStatus(record) === "REUNITED";
}

/** Active LOST rows only (e.g. optional link when contacting a finder). */
export function filterActiveLostReports(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.filter((r) => {
    const s = getNormalizedLostFoundStatus(r) || String(r?.status || "").trim().toUpperCase();
    return s === "LOST";
  });
}

/** Human label for owner context strip (active search vs reunited). */
export function pickOwnerReportStatusLabel(record) {
  if (getNormalizedLostFoundStatus(record) === "REUNITED") return "Reunited";
  const r = String(record?.resolutionStatus || record?.reportResolution || "").trim().toUpperCase();
  if (r === "REUNITED" || r === "RESOLVED" || r === "CLOSED") return "Reunited";
  return "Active";
}

/** Optional story fields after owner marks reunited (camelCase / snake_case). */
export function pickReunionStory(record) {
  if (!record || typeof record !== "object") {
    return { message: "", photoUrl: "" };
  }
  return {
    message: firstNonEmptyTrimmed([record.reunionMessage, record.reunion_message, record.reunionNote, record.reunion_note]),
    photoUrl: firstNonEmptyTrimmed([
      record.reunionPhoto,
      record.reunion_photo,
      record.reunionPhotoUrl,
      record.reunion_photo_url,
      record.reunionImageUrl,
      record.reunion_image_url,
    ]),
  };
}

export function mongoPrimaryKeyString(record) {
  if (!record || typeof record !== "object") return "";
  const mid = record._id;
  if (mid != null && typeof mid === "object" && mid.$oid != null) {
    return String(mid.$oid).trim();
  }
  if (mid != null) return String(mid).trim();
  return "";
}

/**
 * Stable row id for routing and React keys.
 * Prefer `_id` over `uid`: Milo lost-report `_id` equals `sighting.reportId`; `uid` on a row may be a different
 * identifier (e.g. profile id), which would break `/reports/:id/sightings` if used first.
 */
export function getLostFoundStableId(record) {
  if (!record || typeof record !== "object") return "";
  const fromMid = mongoPrimaryKeyString(record);
  if (fromMid) return fromMid;
  const fromUid = firstNonEmptyTrimmed([record.uid]);
  if (fromUid) return fromUid;
  return firstNonEmptyTrimmed([record.id]);
}

/**
 * Report key for `/reports/:id/sightings` — must match `milo_sightings.reportId` (same as report `_id` in your DB).
 */
export function getSightingsApiReportId(record) {
  if (!record || typeof record !== "object") return "";
  return firstNonEmptyTrimmed([
    record.reportId,
    record.report_id,
    record.lnfReportId,
    record.lnf_report_id,
    record.slug,
    mongoPrimaryKeyString(record),
    getLostFoundStableId(record),
  ]);
}

/**
 * Find a lost/found row when opening /lost-found/:id from URL (stable id, uid, or sightings API id).
 */
export function findLostFoundRecordByRouteParam(rows, routeParam) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const decoded = routeParam ? decodeURIComponent(String(routeParam).trim()) : "";
  if (!decoded) return null;
  for (const x of rows) {
    if (!x || typeof x !== "object") continue;
    if (getLostFoundStableId(x) === decoded) return x;
    if (String(x.uid || "").trim() === decoded) return x;
    if (getSightingsApiReportId(x) === decoded) return x;
  }
  return null;
}

/**
 * `uid` path segment for PATCH `{BaseUrl}/lostAndFound/{uid}/reunited` (same style as other lostAndFound routes).
 * Prefer business `uid` on the row and the route param; then stable / sightings ids as fallback.
 */
export function getLostFoundReunionApiUid(record, routeUidParam) {
  const decodeRoute = (p) => {
    const s = String(p || "").trim();
    if (!s) return "";
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  };
  if (record && typeof record === "object") {
    const u = String(record.uid || "").trim();
    if (u) return u;
  }
  const fromRoute = decodeRoute(routeUidParam);
  if (fromRoute) return fromRoute;
  if (record && typeof record === "object") {
    return getLostFoundStableId(record) || getSightingsApiReportId(record) || "";
  }
  return "";
}

/**
 * Some API rows store city/state/zip under `_loc` while `location` is empty or partial.
 * Merge into `location` so list/details/filters behave consistently.
 * Fills `uid` from `_id` when the API omits `uid` so every row has a route-safe id.
 */
export function normalizeLostFoundRecord(record) {
  if (!record || typeof record !== "object") return record;
  const loc = record.location && typeof record.location === "object" ? record.location : {};
  const alt = record._loc && typeof record._loc === "object" ? record._loc : {};
  const merged = {
    ...alt,
    ...loc,
    city: firstNonEmptyTrimmed([loc.city, alt.city]),
    zip: firstNonEmptyTrimmed([loc.zip, alt.zip]),
    state: firstNonEmptyTrimmed([loc.state, alt.state]),
    country: firstNonEmptyTrimmed([loc.country, alt.country]),
    address: firstNonEmptyTrimmed([loc.address, alt.address]),
  };
  const lat = pickNumericCoord(loc.lat, alt.lat, alt.latitude);
  const long = pickNumericCoord(loc.long, alt.long, alt.lng, alt.longitude);
  if (lat !== undefined) merged.lat = lat;
  if (long !== undefined) merged.long = long;

  const uid = getLostFoundStableId(record);
  const normStatus = getNormalizedLostFoundStatus(record);

  return {
    ...record,
    ...(uid ? { uid } : {}),
    location: merged,
    ...(normStatus ? { status: normStatus } : {}),
  };
}

export function normalizeLostFoundRecords(records) {
  if (!Array.isArray(records)) return [];
  return records.map(normalizeLostFoundRecord);
}

export function formatTimeSince(epochMs) {
  if (!epochMs || Number.isNaN(Number(epochMs))) return "—";
  const diff = Math.max(0, Date.now() - Number(epochMs));
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function haversineKm(a, b) {
  if (!a || !b) return null;
  const toRad = (v) => (v * Math.PI) / 180;
  const lat1 = Number(a.lat);
  const lon1 = Number(a.long);
  const lat2 = Number(b.lat);
  const lon2 = Number(b.long);
  if ([lat1, lon1, lat2, lon2].some((v) => Number.isNaN(v))) return null;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLon / 2);
  const aa = s1 * s1 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * s2 * s2;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

/** Raw S3 object key for signing / fallback (not a full https URL when avoidable). */
export function getFirstPhotoStorageKey(record) {
  if (!record?.photos?.length) return "";
  const p = record.photos[0];
  let raw = "";
  if (typeof p === "string") raw = String(p).trim();
  else raw = String(p?.url || p?.path || p?.s3Url || "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    const key = parseAwsS3HttpUrlToObjectKey(raw);
    return key || "";
  }
  return raw;
}

export function pickPhotoUrl(record) {
  if (!record) return "";
  if (record.profilePhoto) return resolveS3UrlForDisplay(record.profilePhoto);
  const topUrl = firstNonEmptyTrimmed([
    record.photoUrl,
    record.photo_url,
    record.imageUrl,
    record.image_url,
    record.image,
  ]);
  if (topUrl) return resolveS3UrlForDisplay(topUrl);
  if (Array.isArray(record.photos) && record.photos.length > 0) {
    const p = record.photos[0];
    if (typeof p === "string") return resolveS3UrlForDisplay(p);

    const url =
      p?.url ||
      p?.s3Url ||
      p?.cloudFrontUrl ||
      p?.cdnUrl ||
      p?.path ||
      p?.imageUrl ||
      p?.image ||
      "";
    if (url) return resolveS3UrlForDisplay(url);

    // If backend echoes base64, render via data URL.
    if (p?.base64Data) {
      const contentType = p?.contentType || "image/jpeg";
      const raw = String(p.base64Data);

      // Some records store raw SVG/XML text in `base64Data` (not actually base64).
      const looksLikeXml = raw.trimStart().startsWith("<") || raw.includes("<svg");
      if (looksLikeXml) {
        return `data:${contentType};utf8,${encodeURIComponent(raw)}`;
      }

      return `data:${contentType};base64,${raw}`;
    }

    return "";
  }
  return "";
}

export async function fileToBase64Data(file) {
  if (!file) return "";
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
  const idx = dataUrl.indexOf("base64,");
  return idx >= 0 ? dataUrl.slice(idx + "base64,".length) : "";
}

