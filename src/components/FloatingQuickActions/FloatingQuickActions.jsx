import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledFloatingQuickActions } from "./styledComponent";
import { useAuth } from "../../contexts/AuthContext";
import { LoginModal } from "../LoginModal";

const MENU_OPTIONS = ["Add your pet", "Lost n found", "Post about your pet"];

const FloatingQuickActions = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!currentUser || !pendingAction) return;
    runAction(pendingAction);
    setPendingAction("");
    setIsLoginModalOpen(false);
  }, [currentUser, pendingAction]);

  const openLoginThenContinue = (action) => {
    setPendingAction(action);
    setIsLoginModalOpen(true);
    setIsOpen(false);
  };

  const handleAddPetAction = () => {
    setIsOpen(false);
    navigate("/add-pet/capture");
  };

  const runAction = (action) => {
    if (action === "Add your pet") {
      handleAddPetAction();
      return;
    }

    if (action === "Lost n found") {
      alert("Lost n found will be enabled next.");
      return;
    }

    if (action === "Post about your pet") {
      alert("Post about your pet will be enabled next.");
    }
  };

  const handleMenuAction = (action) => {
    if (!currentUser) {
      openLoginThenContinue(action);
      return;
    }
    runAction(action);
  };

  return (
    <StyledFloatingQuickActions>
      <div className="floating-actions" ref={containerRef}>
        <div className={`menu ${isOpen ? "open" : ""}`}>
          {MENU_OPTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className="menu-item"
              onClick={() => handleMenuAction(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`fab ${isOpen ? "open" : ""}`}
          aria-label="Open quick actions"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          +
        </button>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingAction("");
        }}
      />
    </StyledFloatingQuickActions>
  );
};

export default FloatingQuickActions;

