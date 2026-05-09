import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

/**
 * GET /lostAndFound sometimes returns:
 * - an array of rows,
 * - a single document,
 * - or buckets such as `{ lost: [...], found: [...] }`.
 */
export function coerceLostFoundRecordList(record) {
  if (record == null) return [];
  if (Array.isArray(record)) return record;
  if (typeof record !== "object") return [];

  const buckets = record;
  const merged = [];
  const seen = new Set();

  const stableRowKey = (row) => {
    if (!row || typeof row !== "object") return "";
    const id = row.uid ?? row.id;
    if (id != null && String(id).trim()) return `id:${String(id)}`;
    const mid = row._id;
    if (mid != null && typeof mid === "object" && mid.$oid != null) return `oid:${mid.$oid}`;
    if (mid != null) return `mid:${String(mid)}`;
    return "";
  };

  const pushUnique = (row) => {
    if (!row || typeof row !== "object") return;
    const k = stableRowKey(row);
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
    buckets.lost,
    buckets.found,
    buckets.lostReports,
    buckets.foundReports,
  ].forEach((arr) => {
    if (Array.isArray(arr)) arr.forEach(pushUnique);
  });

  if (merged.length) return merged;

  const looksLikeDoc =
    Object.prototype.hasOwnProperty.call(buckets, "status") ||
    Object.prototype.hasOwnProperty.call(buckets, "_id") ||
    Object.prototype.hasOwnProperty.call(buckets, "uid") ||
    Array.isArray(buckets.photos);
  if (looksLikeDoc) return [buckets];

  return [];
}

// GET list/search
export async function fetchLostAndFound(params = {}) {
  const token = await getAuthToken().catch(() => "");

  const response = await axios.get(`${BaseUrl}/lostAndFound`, {
    params,
    headers: token ? { token } : undefined,
  });

  return coerceLostFoundRecordList(response?.data?.response?.record);
}

// POST create (JSON body per backend contract)
export async function createLostAndFound(payload = {}) {
  const token = await getAuthToken().catch(() => "");

  const response = await axios.post(`${BaseUrl}/lostAndFound`, payload, {
    headers: token ? { token } : undefined,
  });

  return coerceLostFoundRecordList(response?.data?.response?.record);
}

