import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPetById } from "../../utils/Functions/Pets/getPetById";
import { getAuthToken } from "../../utils/Functions/Pets/getAuthToken";
import { BaseUrl } from "../../utils/Constants/Url";
import { FadeLoader } from "react-spinners";
import { StyledPetProfile } from "./styledComponent";
import defaultAvatar from "../../images/Default_pfp.svg.png";

const DETAIL_FIELDS = [
  { key: "petType", label: "Pet Type" },
  { key: "breed", label: "Breed" },
  { key: "breedCategory", label: "Category" },
  { key: "origin", label: "Origin" },
  { key: "avgMass", label: "Average Mass" },
  { key: "lifespan", label: "Lifespan" },
];

const DetailRow = ({
  label,
  value,
  isEditing,
  onStartEdit,
  onChange,
}) => (
  <div className="detail-row">
    <span>{label}</span>
    <div className="detail-row-right">
      {isEditing ? (
        <input value={value || ""} onChange={onChange} className="detail-input" />
      ) : (
        <strong>{value || "—"}</strong>
      )}
      {!isEditing ? (
        <button type="button" className="edit-btn" onClick={onStartEdit}>
          ✎
        </button>
      ) : null}
    </div>
  </div>
);

export const PetProfilePage = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [editableFields, setEditableFields] = useState({});
  const [manualValues, setManualValues] = useState({
    name: "",
    petType: "",
    breed: "",
    breedCategory: "",
    origin: "",
    avgMass: "",
    lifespan: "",
    description: "",
  });

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const data = await getPetById(petId);
      setPet(data);
      setManualValues({
        name: data?.name || "",
        petType: data?.petType || "",
        breed: data?.breed || "",
        breedCategory: data?.breedCategory || "",
        origin: data?.origin || "",
        avgMass: data?.avgMass || "",
        lifespan: data?.lifespan || "",
        description: data?.description || data?.info || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pet details:", error);
      setLoading(false);
    }
  };

  const profileImage = useMemo(() => {
    if (!pet) return defaultAvatar;
    if (pet.profilePhoto) return pet.profilePhoto;
    if (Array.isArray(pet.photos) && pet.photos.length > 0) {
      const firstPhoto = pet.photos[0];
      return typeof firstPhoto === "string" ? firstPhoto : firstPhoto?.url || defaultAvatar;
    }
    return defaultAvatar;
  }, [pet]);

  const handleSave = async () => {
    if (!petId || !pet) return;
    setSaving(true);
    setSaveError("");

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error("No authentication token available");
      }

      const payload = {
        ...pet,
        name: manualValues.name,
        petType: manualValues.petType,
        breed: manualValues.breed,
        breedCategory: manualValues.breedCategory,
        origin: manualValues.origin,
        avgMass: manualValues.avgMass,
        lifespan: manualValues.lifespan,
        description: manualValues.description,
        info: manualValues.description,
      };

      await axios.put(`${BaseUrl}/pets/${petId}`, payload, {
        headers: {
          token,
        },
      });

      setPet((prev) => ({
        ...prev,
        ...payload,
      }));
      setEditableFields({});
      navigate("/my-pets");
    } catch (error) {
      setSaveError(String(error?.response?.data?.message || error?.message || error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <div style={{ backgroundColor: "#0066ba" }}>
          <Navbar />
        </div>
        <StyledPetProfile>
          <div className="loading-container">
            <FadeLoader color="#f06a8a" />
          </div>
        </StyledPetProfile>
        <Footer />
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <div style={{ backgroundColor: "#0066ba" }}>
          <Navbar />
        </div>
        <StyledPetProfile>
          <div className="error-container">
            <h2>Pet not found</h2>
            <button onClick={() => navigate("/my-pets")} className="back-button">
              Back to My Pets
            </button>
          </div>
        </StyledPetProfile>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#0066ba" }}>
        <Navbar />
      </div>
      <StyledPetProfile>
        <div className="container">
          <div className="header-row">
            <div className="name-row">
              {editableFields.name ? (
                <input
                  className="name-input"
                  value={manualValues.name}
                  onChange={(event) =>
                    setManualValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              ) : (
                <h1>{manualValues.name || "Your Pet"}</h1>
              )}
              {!editableFields.name ? (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setEditableFields((prev) => ({ ...prev, name: true }))}
                >
                  ✎
                </button>
              ) : null}
            </div>
            <p>Pet details ready</p>
          </div>

          <div className="profile-grid">
            <div className="photo-card">
              <img
                src={profileImage}
                alt={manualValues.name || "Pet"}
                onError={(event) => {
                  event.target.src = defaultAvatar;
                }}
              />
            </div>

            <div className="details-card">
              {DETAIL_FIELDS.map((field) => (
                <DetailRow
                  key={field.key}
                  label={field.label}
                  value={manualValues[field.key]}
                  isEditing={!!editableFields[field.key]}
                  onStartEdit={() =>
                    setEditableFields((prev) => ({ ...prev, [field.key]: true }))
                  }
                  onChange={(event) =>
                    setManualValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="info-card">
            <h2>About {manualValues.name || "your pet"}</h2>
            <div className="about-editor">
              {!editableFields.description ? (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() =>
                    setEditableFields((prev) => ({ ...prev, description: true }))
                  }
                >
                  ✎
                </button>
              ) : null}
              {editableFields.description ? (
                <textarea
                  value={manualValues.description}
                  onChange={(event) =>
                    setManualValues((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  placeholder={`Write about ${manualValues.name || "your pet"}`}
                />
              ) : (
                <p>{manualValues.description || "Tap pencil icon to add details."}</p>
              )}
            </div>
          </div>

          {saveError ? <p className="error-line">{saveError}</p> : null}
          <div className="actions-row">
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/my-pets")}
            >
              Back
            </button>
          </div>
        </div>
      </StyledPetProfile>
      <Footer />
    </>
  );
};

export default PetProfilePage;

