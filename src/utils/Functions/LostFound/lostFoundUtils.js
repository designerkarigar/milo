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

