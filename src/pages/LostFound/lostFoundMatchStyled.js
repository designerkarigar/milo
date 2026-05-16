import styled from "styled-components";

export const MatchHubPage = styled.main`
  font-family: Quicksand, system-ui, sans-serif;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 16px 48px;
`;

export const MatchHubTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 18px 0 22px;
`;

export const MatchHubTab = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 0.9rem;
  font-family: inherit;
  background: ${(p) => (p.$active ? "linear-gradient(135deg, #34d399, #0d9488)" : "#f1f5f9")};
  color: ${(p) => (p.$active ? "#fff" : "#475569")};
  box-shadow: ${(p) => (p.$active ? "0 8px 22px rgba(16,185,129,0.25)" : "none")};
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const MatchCard = styled.article`
  background: linear-gradient(165deg, rgba(255, 251, 252, 0.95) 0%, #ffffff 55%);
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 20px;
  padding: 16px 18px;
  margin-bottom: 14px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
`;

export const MatchCardTop = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

export const MatchCardPhoto = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f1f5f9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const MatchCardBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MatchKicker = styled.p`
  margin: 0 0 6px;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #64748b;
`;

export const MatchTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.05rem;
  font-weight: 900;
  color: #0f172a;
`;

export const MatchMessage = styled.p`
  margin: 0 0 10px;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #475569;
  font-weight: 600;
`;

export const MatchMeta = styled.p`
  margin: 0 0 12px;
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 700;
`;

export const MatchChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${(p) => {
    if (p.$status === "ACCEPTED") return "linear-gradient(135deg, #bbf7d0, #86efac)";
    if (p.$status === "REJECTED") return "linear-gradient(135deg, #e2e8f0, #fecdd3)";
    return "linear-gradient(135deg, #fef9c3, #fde68a)";
  }};
  color: ${(p) => {
    if (p.$status === "ACCEPTED") return "#14532d";
    if (p.$status === "REJECTED") return "#7f1d1d";
    return "#854d0e";
  }};
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const MatchActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const MatchBtnPrimary = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 900;
  font-family: inherit;
  font-size: 0.88rem;
  color: #fff;
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.28);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MatchBtnGhost = styled.button`
  border: 1px solid #cbd5e1;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 800;
  font-family: inherit;
  font-size: 0.88rem;
  color: #475569;
  background: #fff;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MatchBtnDanger = styled(MatchBtnGhost)`
  border-color: #fecaca;
  color: #b91c1c;
  background: #fff1f2;
`;

export const MightBePetHelper = styled.p`
  margin: 6px 0 0;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  line-height: 1.45;
  max-width: 520px;
`;

export const MightBePetModalOverlay = styled.div`
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    padding: 20px;
  }
  .modal-content {
    position: relative;
    width: 100%;
    max-width: 460px;
    max-height: 90vh;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 22px;
    padding: 26px 22px 20px;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
    font-family: Quicksand, system-ui, sans-serif;
  }
  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #f1f5f9;
    color: #475569;
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
  }
  .modal-title {
    margin: 0 40px 8px 0;
    font-size: 1.35rem;
    font-weight: 900;
    color: #0f766e;
  }
  .modal-sub {
    margin: 0 0 16px;
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.5;
    font-weight: 600;
  }
  label.field-label {
    display: block;
    font-size: 0.76rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin: 14px 0 6px;
  }
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    border-radius: 14px;
    border: 1px solid #e2e8f0;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
  }
  select {
    padding: 10px 12px;
    background: #fff;
  }
  textarea {
    min-height: 120px;
    padding: 12px;
    resize: vertical;
  }
  .field-error {
    color: #dc2626;
    font-size: 0.82rem;
    font-weight: 800;
    margin-top: 6px;
    display: block;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }
  .actions button {
    flex: 1;
    min-width: 120px;
    border-radius: 999px;
    padding: 12px 14px;
    font-weight: 900;
    font-family: inherit;
    font-size: 0.92rem;
    cursor: pointer;
    border: none;
  }
  .btn-cancel {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0 !important;
  }
  .btn-send {
    background: linear-gradient(135deg, #2dd4bf, #0d9488);
    color: #fff;
    box-shadow: 0 10px 24px rgba(13, 148, 136, 0.3);
  }
  .btn-send:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .success-box {
    padding: 8px 0 4px;
  }
  .success-box p {
    margin: 0 0 16px;
    color: #334155;
    font-weight: 600;
    line-height: 1.55;
    font-size: 0.98rem;
  }
`;
