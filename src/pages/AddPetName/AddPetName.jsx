import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Legacy route: `/add-pet/name?draft=` → same flow now lives on `/add-pet/capture?draft=`.
 */
export const AddPetName = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
      return;
    }
    if (draftId) {
      navigate(`/add-pet/capture?draft=${encodeURIComponent(draftId)}`, {
        replace: true,
      });
    } else {
      navigate("/add-pet/capture", { replace: true });
    }
  }, [currentUser, draftId, navigate]);

  return null;
};

export default AddPetName;
