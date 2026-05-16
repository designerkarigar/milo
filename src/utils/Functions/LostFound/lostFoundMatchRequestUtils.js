import { formatTimeSince, getLostFoundStableId, pickPhotoUrl } from "./lostFoundUtils";

function firstNonEmptyTrimmed(values) {
  for (const v of values) {
    const s = String(v ?? "").trim();
    if (s) return s;
  }
  return "";
}

/** Normalize status for chips */
export function normalizeMatchRequestStatus(raw) {
  const u = String(raw || "").trim().toUpperCase();
  if (u === "ACCEPTED" || u === "APPROVED") return "ACCEPTED";
  if (u === "REJECTED" || u === "DECLINED") return "REJECTED";
  return "PENDING";
}

function pickEmbeddedReport(obj, keys) {
  if (!obj || typeof obj !== "object") return null;
  for (const k of keys) {
    const v = obj[k];
    if (v && typeof v === "object") return v;
  }
  return null;
}

/** Claim document id for PATCH /claim-requests/{claimId} (prefer `_id` from API). */
export function getClaimRequestId(raw) {
  if (!raw || typeof raw !== "object") return "";
  const mid = raw._id;
  if (mid != null && typeof mid === "object" && mid.$oid != null) {
    return String(mid.$oid).trim();
  }
  return firstNonEmptyTrimmed([
    mid,
    raw.claimId,
    raw.claim_id,
    raw.requestId,
    raw.request_id,
    raw.id,
    raw.uid,
  ]);
}

/** Normalize one row from GET /claim-requests/received for finder inbox cards. */
export function normalizeMatchRequestRow(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = getClaimRequestId(raw);

  const foundReport =
    pickEmbeddedReport(raw, ["foundReport", "foundPet", "found", "foundPetReport"]) || null;

  const foundUid = firstNonEmptyTrimmed([
    raw.foundReportId,
    raw.found_report_id,
    raw.foundReportUid,
    raw.found_report_uid,
    raw.foundPetUid,
    raw.foundUid,
    foundReport ? getLostFoundStableId(foundReport) : "",
  ]);

  const lostReport = pickEmbeddedReport(raw, ["lostReport", "linkedLostReport", "lostPet", "lost"]);

  const message = firstNonEmptyTrimmed([raw.message, raw.note, raw.body, raw.text]);
  const requesterName = firstNonEmptyTrimmed([
    raw.requesterName,
    raw.requester_name,
    raw.userName,
    raw.user_name,
    raw.fromUserName,
    raw.requestedBy,
  ]);

  const createdMs = raw.createdAt || raw.crdt || raw.time || raw.sentAt || raw.requestedAt;
  const status = normalizeMatchRequestStatus(raw.status || raw.requestStatus || raw.state);

  const chatRoomId = firstNonEmptyTrimmed([raw.chatRoomId, raw.chat_room_id, raw.roomId, raw.threadId]);

  const foundPetName = firstNonEmptyTrimmed([
    foundReport?.name,
    raw.foundPetName,
    raw.found_pet_name,
    raw.foundName,
  ]);
  const foundPhotoRecord = foundReport && typeof foundReport === "object" ? foundReport : raw;

  const lostName = firstNonEmptyTrimmed([lostReport?.name, raw.lostPetName, raw.lost_pet_name]);
  const lostUid = lostReport
    ? getLostFoundStableId(lostReport)
    : firstNonEmptyTrimmed([raw.lostReportId, raw.lost_report_id, raw.lostReportUid, raw.lost_report_uid]);

  return {
    id,
    foundUid: foundUid || (foundReport ? getLostFoundStableId(foundReport) : ""),
    foundPetName: foundPetName || "Found pet",
    foundPhotoUrl: pickPhotoUrl(foundPhotoRecord),
    requesterName: requesterName || "MILO member",
    message,
    status,
    createdMs: createdMs != null ? Number(createdMs) : NaN,
    timeLabel: Number.isFinite(Number(createdMs)) ? formatTimeSince(Number(createdMs)) : "—",
    lostReport: lostReport || (lostName ? { name: lostName, uid: lostUid } : null),
    chatRoomId,
    raw,
  };
}

export { filterActiveLostReports } from "./lostFoundUtils";
