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

/**
 * Owner marks a lost report as reunited.
 *
 * PATCH `{BaseUrl}/lostAndFound/:reportUid/reunited` — same `BaseUrl` as other lostAndFound APIs.
 * Request body is optional: include `reunionMessage` and/or `reunionPhoto` only when set; otherwise `{}`.
 *
 * Example (Windows cmd / PowerShell):
 * ```bash
 * curl.exe -sS -X PATCH "https://st40k7zbg3.execute-api.ap-south-1.amazonaws.com/v1/lostAndFound/REPORT_UID_HERE/reunited" ^
 *   -H "accept: application/json" ^
 *   -H "content-type: application/json" ^
 *   -H "token: YOUR_JWT_OR_MILO_TOKEN_HERE" ^
 *   -d "{\"reunionMessage\":\"Thank you everyone for helping us find Rosy.\",\"reunionPhoto\":\"https://example.com/optional-photo.jpg\"}"
 * ```
 *
 * @param {string} reportUid — Report id in the path (`REPORT_UID_HERE`).
 * @param {{ reunionMessage?: string, reunionPhoto?: string, reunionPhotoUrl?: string }} [options] — Both optional; `reunionPhotoUrl` is accepted as an alias for `reunionPhoto` (wire name in JSON is `reunionPhoto`).
 * @returns {Promise<object|null>} Updated record when the API returns one, otherwise null.
 */
export async function markLostReportReunited(reportUid, options = {}) {
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");
  const id = String(reportUid || "").trim();
  if (!id) throw new Error("Missing report id");

  const reunionMessage = String(options.reunionMessage || "").trim();
  const reunionPhoto = String(options.reunionPhoto || options.reunionPhotoUrl || "").trim();

  const body = {};
  if (reunionMessage) body.reunionMessage = reunionMessage;
  if (reunionPhoto) body.reunionPhoto = reunionPhoto;

  const base = `${String(BaseUrl || "").replace(/\/+$/, "")}/`;
  const reuniteUrl = new URL(`lostAndFound/${encodeURIComponent(id)}/reunited`, base).toString();

  const response = await axios.patch(reuniteUrl, body, {
    headers: {
      token,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const raw = response?.data?.response?.record;
  const list = coerceLostFoundRecordList(raw);
  if (list.length) return list[0];
  if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
  return null;
}
