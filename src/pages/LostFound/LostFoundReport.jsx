import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { createLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import { fileToBase64Data } from "../../utils/Functions/LostFound/lostFoundUtils";

export const LostFoundReportPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const userName = useMemo(() => {
    return (
      localStorage.getItem("username") ||
      currentUser?.displayName ||
      currentUser?.email ||
      ""
    );
  }, [currentUser]);

  const [status, setStatus] = useState("LOST");
  const [petType, setPetType] = useState("DOG");
  const [gender, setGender] = useState("male");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("Noida");
  const [zip, setZip] = useState("201301");
  const [description, setDescription] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!userName) {
      toast.error("Login required.");
      navigate("/home");
      return;
    }
    if (!color.trim()) {
      toast.warning("Please enter color.");
      return;
    }
    if (!contactDetails.trim()) {
      toast.warning("Please enter contact number.");
      return;
    }
    if (!photoFile) {
      toast.warning("Please upload a photo.");
      return;
    }

    try {
      setSaving(true);
      const base64Data = await fileToBase64Data(photoFile);
      if (!base64Data) {
        toast.error("Could not read the photo. Please try another image.");
        return;
      }

      await createLostAndFound({
        userName,
        status: String(status || "LOST").toUpperCase(),
        petType,
        breed: breed || "Unknown",
        name: name || "Unknown",
        gender,
        color,
        description: description || "string",
        photos: [
          {
            base64Data,
            type: "IMAGE",
            contentType: photoFile.type || "image/jpeg",
            name: photoFile.name || "pet photo",
          },
        ],
        location: {
          city,
          zip,
          country: "India",
          state: "UP",
          address: "Flat No. 1103, Gardenia Square, Sector-75",
          lat: 28.671982403645234,
          long: 77.21181524175785,
        },
        contactDetails,
      });
      toast.success("Report submitted.");
      navigate("/lost-found");
    } catch (error) {
      toast.error(String(error?.response?.data?.message || error?.message || error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Report</h1>
            <p>Create a basic Lost/Found report.</p>
          </div>
          <div className="wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <div className="content">
          <div className="toolbar">
            <div className="filters">
              <button
                type="button"
                className={`pill ${status === "LOST" ? "active" : ""}`}
                onClick={() => setStatus("LOST")}
              >
                Lost
              </button>
              <button
                type="button"
                className={`pill ${status === "FOUND" ? "active" : ""}`}
                onClick={() => setStatus("FOUND")}
              >
                Found
              </button>
            </div>
            <button type="button" className="pill" onClick={() => navigate("/lost-found")}>
              Back
            </button>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #ececf4",
              borderRadius: 16,
              padding: 16,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Breed</div>
                <input
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Pet Type</div>
                <select value={petType} onChange={(e) => setPetType(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }}>
                  <option value="DOG">DOG</option>
                  <option value="CAT">CAT</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Gender</div>
                <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }}>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="unknown">unknown</option>
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Color</div>
                <input value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }} />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Contact</div>
                <input value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }} />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>City</div>
                <input value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }} />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>ZIP</div>
                <input value={zip} onChange={(e) => setZip(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }} />
              </label>
            </div>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Photo</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setPhotoFile(file);
                  setPhotoPreview(file ? URL.createObjectURL(file) : "");
                }}
              />
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    marginTop: 10,
                    width: "100%",
                    maxHeight: 280,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid #ececf4",
                  }}
                />
              ) : null}
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Description</div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, minHeight: 120 }} />
            </label>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button type="button" className="primary" onClick={handleSubmit} disabled={saving}>
                {saving ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
};

export default LostFoundReportPage;

