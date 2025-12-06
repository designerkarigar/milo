import React, { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";

export const useImageModal = () => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const ImageModal = () => (
    <CModal
      visible={imageModalVisible}
      onClose={() => setImageModalVisible(false)}
      alignment="center"
      size="xl"
    >
      <CModalHeader>
        <h5>Image Preview</h5>
      </CModalHeader>
      <CModalBody className="text-center">
        <img
          src={selectedImage}
          alt="Preview"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "80vh",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
          }}
        />
      </CModalBody>
    </CModal>
  );

  return { openImageModal, ImageModal };
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleString();
};

