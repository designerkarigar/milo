const drafts = new Map();
const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const createPetDraft = (draftInput = {}) => {
  const id =
    draftInput.id || `pet-draft-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  const draft = {
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    name: "",
    previewUrl: "",
    firebaseUrl: "",
    uploadStatus: "pending",
    aiStatus: "pending",
    createPetStatus: "pending",
    updatePetStatus: "pending",
    createdPetUid: "",
    aiResult: null,
    aiError: "",
    error: "",
    ...draftInput,
  };
  drafts.set(id, draft);
  notify();
  return draft;
};

export const updatePetDraft = (id, patch = {}) => {
  const existing = drafts.get(id);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...patch,
    updatedAt: Date.now(),
  };
  drafts.set(id, updated);
  notify();
  return updated;
};

export const getPetDraft = (id) => {
  if (!id) return null;
  return drafts.get(id) || null;
};

/**
 * Atomically move `createPetStatus` from `pending` → `processing` so only one
 * effect run can start POST /pets (avoids duplicates when draft updates, e.g. AI failure,
 * retrigger the effect while the first run is still awaiting getCurrentUserPetCount).
 * @returns {boolean} true if this caller claimed creation
 */
export const claimPetCreationIfPending = (id) => {
  const existing = drafts.get(id);
  if (!existing) return false;
  if (!existing.name || !existing.firebaseUrl) return false;
  if (existing.createdPetUid) return false;
  if (existing.createPetStatus !== "pending") return false;
  const updated = {
    ...existing,
    createPetStatus: "processing",
    updatedAt: Date.now(),
  };
  drafts.set(id, updated);
  notify();
  return true;
};

export const subscribePetDrafts = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

