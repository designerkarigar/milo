import { useState, useEffect } from "react";

export const useEditMode = (initialData) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPhotos(initialData.photos || []);
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handlePhotoAccept = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], verified: true };
      return updated;
    });
  };

  const handlePhotoReject = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], verified: false };
      return updated;
    });
  };

  const resetForm = () => {
    if (initialData) {
      setFormData(initialData);
      setPhotos(initialData.photos || []);
    }
  };

  return {
    isEditMode,
    setIsEditMode,
    formData,
    setFormData,
    photos,
    setPhotos,
    loading,
    setLoading,
    handleInputChange,
    handleLocationChange,
    handlePhotoAccept,
    handlePhotoReject,
    resetForm,
  };
};

