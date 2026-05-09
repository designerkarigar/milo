import React, { useEffect, useRef, useState } from "react";
import { pickPhotoUrl, getFirstPhotoStorageKey } from "../../utils/Functions/LostFound/lostFoundUtils";
import { tryGetSignedPublicUrl } from "../../utils/Functions/LostFound/signedLostFoundPhotoUrl";

export function LostFoundPetPhoto({ record, fallbackSrc, alt }) {
  const rawKey = getFirstPhotoStorageKey(record);
  const mainSrc = pickPhotoUrl(record) || fallbackSrc;
  const [src, setSrc] = useState(mainSrc);
  const attemptRef = useRef(0);

  useEffect(() => {
    attemptRef.current = 0;
    setSrc(pickPhotoUrl(record) || fallbackSrc);
  }, [record, fallbackSrc]);

  const handleError = async () => {
    if (attemptRef.current === 0) {
      attemptRef.current = 1;
      if (rawKey) {
        const signed = await tryGetSignedPublicUrl(rawKey);
        if (signed) {
          setSrc(signed);
          return;
        }
      }
      attemptRef.current = 2;
      setSrc(fallbackSrc);
      return;
    }
    if (attemptRef.current < 2) {
      attemptRef.current = 2;
      setSrc(fallbackSrc);
    }
  };

  return <img src={src} alt={alt} onError={handleError} />;
}
