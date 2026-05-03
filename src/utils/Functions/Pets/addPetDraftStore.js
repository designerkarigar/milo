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

export const subscribePetDrafts = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

