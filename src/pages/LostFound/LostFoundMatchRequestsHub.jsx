import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { StyledLostFound } from "./styledComponent";
import {
  MatchHubPage,
  MatchCard,
  MatchCardBody,
  MatchCardPhoto,
  MatchCardTop,
  MatchActions,
  MatchBtnDanger,
  MatchBtnGhost,
  MatchBtnPrimary,
  MatchChipRow,
  MatchKicker,
  MatchMessage,
  MatchMeta,
  MatchTitle,
  StatusChip,
} from "./lostFoundMatchStyled";
import {
  acceptMatchRequest,
  fetchIncomingMatchRequests,
  parseClaimApiError,
  rejectMatchRequest,
} from "../../utils/Functions/LostFound/lostFoundMatchRequestApi";
import { normalizeMatchRequestRow } from "../../utils/Functions/LostFound/lostFoundMatchRequestUtils";
import { formatLostFoundLastSeenLine, formatTimeSince } from "../../utils/Functions/LostFound/lostFoundUtils";
import defaultPhoto from "../../images/svgfiles/avatar-1.svg";

function truncate(s, max = 160) {
  const t = String(s || "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export function LostFoundMatchRequestsHubPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [incoming, setIncoming] = useState([]);
  const [busyId, setBusyId] = useState("");
  const [rejecting, setRejecting] = useState(null);

  const loadIncoming = useCallback(async () => {
    if (!currentUser) {
      setIncoming([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const incRaw = await fetchIncomingMatchRequests();
      const rows = (Array.isArray(incRaw) ? incRaw : [])
        .map(normalizeMatchRequestRow)
        .filter((r) => r && r.id);
      setIncoming(rows);
    } catch (e) {
      toast.error(String(e?.message || e));
      setIncoming([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadIncoming();
  }, [loadIncoming]);

  const handleAccept = async (row) => {
    const claimId = row?.id;
    if (!claimId) {
      toast.error("Missing claim id for this request.");
      return;
    }
    const key = `${claimId}-accept`;
    try {
      setBusyId(key);
      const res = await acceptMatchRequest(claimId);
      toast.success("Request accepted.");
      await loadIncoming();
      const room =
        res?.chatRoomId ||
        res?.chat_room_id ||
        res?.roomId ||
        row.chatRoomId ||
        "";
      if (room) {
        navigate(`/lost-found/match-room/${encodeURIComponent(room)}`);
      }
    } catch (e) {
      toast.error(parseClaimApiError(e) || "Could not accept this request.");
    } finally {
      setBusyId("");
    }
  };

  const handleReject = async (row) => {
    const claimId = row?.id;
    if (!claimId) return;
    const key = `${claimId}-reject`;
    try {
      setBusyId(key);
      await rejectMatchRequest(claimId);
      toast.success("Request rejected.");
      setRejecting(null);
      await loadIncoming();
    } catch (e) {
      toast.error(parseClaimApiError(e) || "Could not reject this request.");
    } finally {
      setBusyId("");
    }
  };

  const renderLostLinkLine = (row) => {
    const lr = row.lostReport;
    if (!lr || typeof lr !== "object") return null;
    const name = lr.name || "Linked pet";
    const city = lr.location?.city || lr.city || "—";
    const t = lr.reportedAt || lr.crdt || lr.time;
    const ago = t != null && Number.isFinite(Number(t)) ? formatTimeSince(Number(t)) : "—";
    const addr = formatLostFoundLastSeenLine(lr);
    const place = addr && addr !== "—" ? addr : city;
    return (
      <MatchMeta>
        <strong>Lost pet linked:</strong> {name} · posted {ago} · {place}
      </MatchMeta>
    );
  };

  const renderIncomingCard = (row) => {
    const isBusy = busyId.startsWith(`${row.id}-`);
    const showReject = rejecting?.id === row.id;
    return (
      <MatchCard key={`${row.foundUid}-${row.id}`}>
        <MatchKicker>🐾 Someone thinks this may be their pet</MatchKicker>
        <MatchCardTop>
          <MatchCardPhoto>
            <img src={row.foundPhotoUrl || defaultPhoto} alt="" />
          </MatchCardPhoto>
          <MatchCardBody>
            <MatchTitle>{row.foundPetName}</MatchTitle>
            <MatchMeta>
              From <strong>{row.requesterName}</strong> · {row.timeLabel}
            </MatchMeta>
            <MatchMessage>&ldquo;{truncate(row.message)}&rdquo;</MatchMessage>
            {renderLostLinkLine(row)}
            <MatchChipRow>
              <StatusChip $status={row.status}>
                {row.status === "PENDING" ? "Pending" : row.status === "ACCEPTED" ? "Accepted" : "Rejected"}
              </StatusChip>
            </MatchChipRow>
            {row.status === "PENDING" ? (
              <>
                {showReject ? (
                  <MatchMeta style={{ marginTop: 8 }}>
                    Are you sure you want to reject this request?
                  </MatchMeta>
                ) : null}
                <MatchActions>
                  <MatchBtnPrimary
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleAccept(row)}
                  >
                    {busyId === `${row.id}-accept` ? "Working…" : "Accept"}
                  </MatchBtnPrimary>
                  {!showReject ? (
                    <MatchBtnDanger type="button" disabled={isBusy} onClick={() => setRejecting(row)}>
                      Reject
                    </MatchBtnDanger>
                  ) : (
                    <>
                      <MatchBtnDanger type="button" disabled={isBusy} onClick={() => handleReject(row)}>
                        {busyId === `${row.id}-reject` ? "Working…" : "Yes, reject"}
                      </MatchBtnDanger>
                      <MatchBtnGhost type="button" disabled={isBusy} onClick={() => setRejecting(null)}>
                        Cancel
                      </MatchBtnGhost>
                    </>
                  )}
                </MatchActions>
              </>
            ) : row.status === "ACCEPTED" ? (
              <>
                <MatchMeta style={{ marginTop: 4, color: "#047857" }}>You accepted this request.</MatchMeta>
                {row.chatRoomId ? (
                  <MatchActions>
                    <MatchBtnPrimary
                      type="button"
                      onClick={() => navigate(`/lost-found/match-room/${encodeURIComponent(row.chatRoomId)}`)}
                    >
                      Open chat
                    </MatchBtnPrimary>
                  </MatchActions>
                ) : null}
              </>
            ) : (
              <MatchMeta style={{ marginTop: 4 }}>You declined this request.</MatchMeta>
            )}
          </MatchCardBody>
        </MatchCardTop>
      </MatchCard>
    );
  };

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Requests for my found pets</h1>
            <p>Review private messages from people who think a pet you found may be theirs.</p>
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

        <MatchHubPage className="content">
          <button type="button" className="pill" onClick={() => navigate("/lost-found")}>
            Back to Lost & Found
          </button>

          {!currentUser ? (
            <p style={{ fontWeight: 700, color: "#64748b", marginTop: 18 }}>Sign in to view requests.</p>
          ) : loading ? (
            <p style={{ fontWeight: 700, color: "#64748b", marginTop: 18 }}>Loading…</p>
          ) : incoming.length ? (
            <div style={{ marginTop: 18 }}>{incoming.map(renderIncomingCard)}</div>
          ) : (
            <p style={{ fontWeight: 700, color: "#64748b", marginTop: 18 }}>
              No requests yet. When someone uses &ldquo;This might be my pet&rdquo; on a pet you found, it will show up
              here.
            </p>
          )}
        </MatchHubPage>
      </StyledLostFound>
      <Footer />
    </>
  );
}

export default LostFoundMatchRequestsHubPage;
