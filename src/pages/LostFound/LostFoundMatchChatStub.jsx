import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { StyledLostFound } from "./styledComponent";

/**
 * Placeholder when backend returns a chatRoomId after accepting a match request.
 * Wire this route to your real chat experience when available.
 */
export function LostFoundMatchChatStubPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const decoded = roomId ? decodeURIComponent(roomId) : "";

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Connect with finder</h1>
            <p>Your safe chat space is almost ready.</p>
          </div>
          <div className="wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>
        <div className="content" style={{ maxWidth: 560, margin: "0 auto" }}>
          <button type="button" className="pill" onClick={() => navigate("/lost-found/match-requests")}>
            Back to match requests
          </button>
          <div
            style={{
              marginTop: 20,
              padding: 22,
              borderRadius: 18,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontWeight: 600,
              color: "#475569",
              lineHeight: 1.55,
            }}
          >
            <p style={{ marginTop: 0 }}>
              MILO will open your conversation here once in-app chat is connected. For now, your match is saved and the
              finder has been notified.
            </p>
            <p style={{ marginBottom: 0, fontSize: "0.88rem", color: "#64748b" }}>
              Conversation id: <code style={{ wordBreak: "break-all" }}>{decoded || "—"}</code>
            </p>
          </div>
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
}

export default LostFoundMatchChatStubPage;
