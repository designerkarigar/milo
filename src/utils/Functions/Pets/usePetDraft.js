import { useEffect, useState } from "react";
import { getPetDraft, subscribePetDrafts } from "./addPetDraftStore";

export const usePetDraft = (draftId) => {
  const [draft, setDraft] = useState(() => getPetDraft(draftId));

  useEffect(() => {
    setDraft(getPetDraft(draftId));
    const unsubscribe = subscribePetDrafts(() => {
      setDraft(getPetDraft(draftId));
    });
    return unsubscribe;
  }, [draftId]);

  return draft;
};
