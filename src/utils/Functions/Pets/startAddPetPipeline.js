import { createPetDraft, updatePetDraft } from "./addPetDraftStore";
import { detectPetFromImage } from "./detectPetFromImage";
import { uploadPetImageToFirebase } from "./uploadPetImageToFirebase";

const runPipelineForDraft = ({ draftId, file, currentUser }) => {
  const previewUrl = URL.createObjectURL(file);
  updatePetDraft(draftId, {
    previewUrl,
    firebaseUrl: "",
    uploadStatus: "uploading",
    aiStatus: "pending",
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
      });

      const aiResult = await detectPetFromImage(firebaseUrl);
      updatePetDraft(draftId, {
        aiResult,
        aiStatus: "done",
      });
    } catch (error) {
      updatePetDraft(draftId, {
        uploadStatus: "failed",
        aiStatus: "failed",
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

