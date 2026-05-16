import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

function coerceList(payload) {
  if (payload == null) return [];
  if (Array.isArray(payload)) return payload;
  if (typeof payload !== "object") return [];
  const o = payload;
  for (const k of ["requests", "items", "records", "list", "data", "rows", "claims"]) {
    if (Array.isArray(o[k])) return o[k];
  }
  return [];
}

function pickClaimRecord(response) {
  const d = response?.data;
  if (!d || typeof d !== "object") return null;
  if (d.record && typeof d.record === "object" && !Array.isArray(d.record)) return d.record;
  const res = d.response;
  if (res?.record && typeof res.record === "object" && !Array.isArray(res.record)) return res.record;
  if (res && typeof res === "object" && !Array.isArray(res)) return res;
  return d;
}

/** Extract claim rows from GET list responses ({ response: { record: [...] } } or similar). */
function pickClaimList(response) {
  const d = response?.data;
  if (!d || typeof d !== "object") return [];
  if (Array.isArray(d)) return d;
  if (Array.isArray(d.record)) return d.record;
  const res = d.response;
  if (res && Array.isArray(res.record)) return res.record;
  if (Array.isArray(res)) return res;
  return coerceList(d);
}

/**
 * Create a claim when a pet owner thinks a FOUND post may be their pet.
 * POST /v1/claim-requests
 * Body: { foundReportId, message, lostReportId? }
 */
export async function createFoundPetMatchRequest(foundReportId, body) {
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");
  const foundId = String(foundReportId || body?.foundReportId || "").trim();
  if (!foundId) throw new Error("Missing found report id");

  const payload = {
    foundReportId: foundId,
    message: String(body?.message || "").trim(),
  };
  const lostId = String(body?.lostReportId || body?.lostReportUid || "").trim();
  if (lostId) payload.lostReportId = lostId;

  const response = await axios.post(`${BaseUrl}/claim-requests`, payload, {
    headers: {
      token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return pickClaimRecord(response);
}

/**
 * Claims received on pets you reported as FOUND (finder inbox).
 * GET /v1/claim-requests/received
 */
export async function fetchIncomingMatchRequests() {
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");
  const response = await axios.get(`${BaseUrl}/claim-requests/received`, {
    headers: { token, Accept: "application/json" },
  });
  return pickClaimList(response);
}

/** @param {"ACCEPTED"|"REJECTED"} status */
function assertClaimStatus(status) {
  const u = String(status || "").trim().toUpperCase();
  if (u === "ACCEPTED" || u === "REJECTED") return u;
  throw new Error("Invalid claim status");
}

/**
 * Update claim status (finder only). Same endpoint for accept and reject.
 * PATCH /v1/claim-requests/:claimId
 * Body: { status: "ACCEPTED" } | { status: "REJECTED" }
 * @param {string} claimId — claim `_id` from POST create or GET /claim-requests/received
 */
export async function patchClaimRequestStatus(claimId, status) {
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");
  const id = String(claimId || "").trim();
  if (!id) throw new Error("Missing claim id");
  const normalizedStatus = assertClaimStatus(status);

  const response = await axios.patch(
    `${BaseUrl}/claim-requests/${encodeURIComponent(id)}`,
    { status: normalizedStatus },
    {
      headers: {
        token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return pickClaimRecord(response);
}

/** Finder accepts a PENDING claim. */
export function acceptMatchRequest(claimId) {
  return patchClaimRequestStatus(claimId, "ACCEPTED");
}

/** Finder rejects a PENDING claim. */
export function rejectMatchRequest(claimId) {
  return patchClaimRequestStatus(claimId, "REJECTED");
}

/** Pull a human-readable error from claim API responses. */
export function parseClaimApiError(error) {
  const d = error?.response?.data;
  if (!d) return String(error?.message || error || "Something went wrong.");
  if (typeof d.message === "string" && d.message.trim()) return d.message.trim();
  const nested = d.response;
  if (nested && typeof nested.message === "string" && nested.message.trim()) return nested.message.trim();
  return String(error?.message || error || "Something went wrong.");
}
