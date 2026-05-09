import { resolveS3Url } from "../Others/resolveS3Url";

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

function pickNumericCoord(...vals) {
  for (const v of vals) {
    if (v == null || v === "") continue;
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
}

/** Map API status variants to `LOST` | `FOUND` so filters match list payloads. */
export function getNormalizedLostFoundStatus(record) {
  if (!record || typeof record !== "object") return "";
  const raw = firstNonEmptyTrimmed([
    record.status,
    record.reportStatus,
    record.report_status,
    record.lostFoundStatus,
    record.lost_found_status,
  ]);
  const u = String(raw).trim().toUpperCase();
  if (!u) return "";
  if (u === "FOUND" || u === "FIND" || u === "FOUND_PET") return "FOUND";
  if (u === "LOST" || u === "MISSING") return "LOST";
  return u;
}

/** Stable row id for routing, React keys, and linking `uid` ↔ Mongo `_id`. */
export function getLostFoundStableId(record) {
  if (!record || typeof record !== "object") return "";
  const fromUid = firstNonEmptyTrimmed([record.uid]);
  if (fromUid) return fromUid;
  const mid = record._id;
  if (mid != null && typeof mid === "object" && mid.$oid != null) {
    return String(mid.$oid).trim();
  }
  if (mid != null) return String(mid).trim();
  return firstNonEmptyTrimmed([record.id]);
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

/** Raw S3/storage key from DB (before CloudFront base + encoding). */
export function getFirstPhotoStorageKey(record) {
  if (!record?.photos?.length) return "";
  const p = record.photos[0];
  if (typeof p === "string") return p;
  return p?.url || p?.path || p?.s3Url || "";
}

export function pickPhotoUrl(record) {
  if (!record) return "";
  if (record.profilePhoto) return resolveS3Url(record.profilePhoto);
  if (Array.isArray(record.photos) && record.photos.length > 0) {
    const p = record.photos[0];
    if (typeof p === "string") return resolveS3Url(p);

    const url =
      p?.url ||
      p?.s3Url ||
      p?.cloudFrontUrl ||
      p?.cdnUrl ||
      p?.path ||
      "";
    if (url) return resolveS3Url(url);

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

