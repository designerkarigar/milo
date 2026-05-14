import { createPetDraft, getPetDraft, updatePetDraft } from "./addPetDraftStore";
import { detectPetFromImage } from "./detectPetFromImage";
import { uploadPetImageToFirebase } from "./uploadPetImageToFirebase";

/**
 * Runs pet detection independently of POST /pets. Call after `firebaseUrl` is set.
 */
export const startPetDetectionForDraft = (draftId, firebaseUrl) => {
  if (!draftId || !firebaseUrl) return;

  (async () => {
    const snapshot = getPetDraft(draftId);
    if (!snapshot || snapshot.firebaseUrl !== firebaseUrl) return;

    try {
      const aiResult = await detectPetFromImage(firebaseUrl);
      const latest = getPetDraft(draftId);
      if (!latest || latest.firebaseUrl !== firebaseUrl) return;
      updatePetDraft(draftId, {
        aiResult,
        aiStatus: "done",
        aiError: "",
      });
    } catch (error) {
      const latest = getPetDraft(draftId);
      if (!latest || latest.firebaseUrl !== firebaseUrl) return;
      updatePetDraft(draftId, {
        aiStatus: "failed",
        aiError: String(error?.message || error),
      });
    }
  })();
};

const runPipelineForDraft = ({ draftId, file, currentUser }) => {
  const previewUrl = URL.createObjectURL(file);
  updatePetDraft(draftId, {
    previewUrl,
    firebaseUrl: "",
    uploadStatus: "uploading",
    aiStatus: "pending",
    aiError: "",
    createPetStatus: "pending",
    updatePetStatus: "pending",
    createdPetUid: "",
    aiResult: null,
    error: "",
  });

  (async () => {
    try {
      const firebaseUrl = await uploadPetImageToFirebase({ file, currentUser });
      updatePetDraft(draftId, {
        firebaseUrl,
        uploadStatus: "done",
        aiStatus: "processing",
        aiError: "",
      });
      startPetDetectionForDraft(draftId, firebaseUrl);
    } catch (error) {
      updatePetDraft(draftId, {
        uploadStatus: "failed",
        error: String(error?.message || error),
      });
    }
  })();
};

export const startAddPetPipeline = ({ file, currentUser }) => {
  const draft = createPetDraft({
    uploadStatus: "pending",
    aiStatus: "pending",
  });
  runPipelineForDraft({ draftId: draft.id, file, currentUser });

  return draft.id;
};

export const restartAddPetPipeline = ({ draftId, file, currentUser }) => {
  if (!draftId) {
    throw new Error("Missing draft id");
  }
  runPipelineForDraft({ draftId, file, currentUser });
  return draftId;
};
