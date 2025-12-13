import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase";
import { StyledLoginModal } from "./styledComponent";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Initialize reCAPTCHA when phone login is selected
  const initializeRecaptcha = () => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
          },
        }
      );
      setRecaptchaVerifier(verifier);
      return verifier;
    }
    return recaptchaVerifier;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, facebookProvider);
      onClose();
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const verifier = initializeRecaptcha();
      const phoneNumber = `+${countryCode}${phone}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      setConfirmationResult(confirmation);
      setShowPhoneVerification(true);
    } catch (error) {
      setError(getErrorMessage(error.code));
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        setRecaptchaVerifier(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerification = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmationResult.confirm(verificationCode);
      onClose();
      setPhone("");
      setCountryCode("");
      setVerificationCode("");
      setShowPhoneVerification(false);
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        setRecaptchaVerifier(null);
      }
    } catch (error) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with this email using a different sign-in method.";
      case "auth/invalid-phone-number":
        return "Invalid phone number.";
      case "auth/invalid-verification-code":
        return "Invalid verification code.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setPhone("");
    setCountryCode("");
    setVerificationCode("");
    setError("");
    setShowPhoneVerification(false);
    setConfirmationResult(null);
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      setRecaptchaVerifier(null);
    }
  };

  if (!isOpen) return null;

  return (
    <StyledLoginModal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>

          <div className="modal-header">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <p>
              {isLogin
                ? "Welcome back! Please login to your account"
                : "Create a new account to get started"}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="auth-tabs">
            <button
              className={`tab ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
            >
              Login
            </button>
            <button
              className={`tab ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-methods">
            {/* Social Login Buttons */}
            <div className="social-buttons">
              <button
                className="social-btn google-btn"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                className="social-btn facebook-btn"
                onClick={handleFacebookSignIn}
                disabled={loading}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="#1877F2"
                  />
                </svg>
                Continue with Facebook
              </button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Email/Password Form */}
            {!showPhoneVerification ? (
              <>
                <form onSubmit={handleEmailAuth} className="auth-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>

                  {isLogin && (
                    <button
                      type="button"
                      className="forgot-password"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                  )}

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
                  </button>
                </form>

                <div className="divider">
                  <span>OR</span>
                </div>

                {/* Phone Authentication */}
                <form onSubmit={handlePhoneAuth} className="auth-form">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="phone-input-group">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="phone-code"
                        required
                        disabled={loading}
                      >
                        <option value="">Code</option>
                        <option value="1">+1 (US)</option>
                        <option value="91">+91 (IN)</option>
                        <option value="44">+44 (UK)</option>
                        <option value="61">+61 (AU)</option>
                        <option value="86">+86 (CN)</option>
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter your phone number"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending code..." : "Send Verification Code"}
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handlePhoneVerification} className="auth-form">
                <div className="form-group">
                  <label>Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    required
                    disabled={loading}
                    maxLength={6}
                  />
                  <p className="help-text">
                    We sent a verification code to your phone
                  </p>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  type="button"
                  className="back-button"
                  onClick={() => {
                    setShowPhoneVerification(false);
                    setVerificationCode("");
                    setError("");
                  }}
                >
                  Back
                </button>
              </form>
            )}

            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </StyledLoginModal>
  );
};

export default LoginModal;

