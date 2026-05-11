import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

function coerceSightingsList(record) {
  if (record == null) return [];
  if (Array.isArray(record)) return record;
  if (typeof record !== "object") return [];
  const buckets = record;
  const merged = [];
  const seen = new Set();

  const stableKey = (row) => {
    if (!row || typeof row !== "object") return "";
    const id = row.uid ?? row.id ?? row.sightingId;
    if (id != null && String(id).trim()) return `id:${String(id)}`;
    const mid = row._id;
    if (mid != null && typeof mid === "object" && mid.$oid != null) return `oid:${mid.$oid}`;
    if (mid != null) return `mid:${String(mid)}`;
    const t = row.seenAt || row.seen_at;
    const a = row.location?.address || row.address;
    return t && a ? `ta:${t}:${a}` : "";
  };

  const pushUnique = (row) => {
    if (!row || typeof row !== "object") return;
    const k = stableKey(row);
    if (k) {
      if (seen.has(k)) return;
      seen.add(k);
    }
    merged.push(row);
  };

  [
    buckets.all,
    buckets.data,
    buckets.records,
    buckets.list,
    buckets.items,
    buckets.sightings,
    buckets.rows,
    buckets.results,
  ].forEach((arr) => {
    if (Array.isArray(arr)) arr.forEach(pushUnique);
  });

  if (merged.length) return merged;
  const looksLikeDoc =
    Object.prototype.hasOwnProperty.call(buckets, "seenAt") ||
    Object.prototype.hasOwnProperty.call(buckets, "seen_at") ||
    Object.prototype.hasOwnProperty.call(buckets, "location") ||
    Object.prototype.hasOwnProperty.call(buckets, "reportId");
  if (looksLikeDoc) return [buckets];

  return [];
}

/** GET sightings for a report (owner / authorized users per backend). */
export async function fetchSightingsForReport(reportId) {
  if (!reportId) throw new Error("Missing reportId");
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");

  const response = await axios.get(`${BaseUrl}/reports/${encodeURIComponent(reportId)}/sightings`, {
    headers: {
      token,
      accept: "application/json",
    },
  });

  const res = response?.data?.response;
  const payload = res?.record !== undefined ? res.record : res;
  return coerceSightingsList(payload);
}

export async function createSighting(reportId, payload) {
  if (!reportId) throw new Error("Missing reportId");
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");

  const response = await axios.post(`${BaseUrl}/reports/${reportId}/sightings`, payload, {
    headers: {
      token,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  return response?.data?.response?.record || null;
}

