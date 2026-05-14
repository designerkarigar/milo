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
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { syncMiloProfileAfterFirebaseAuth } from "../../utils/Functions/Authentication/syncMiloProfileAfterFirebaseAuth";
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
  const [confirmationResult, setConfirmationResult] = useState(null);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const rollbackFirebaseSession = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    localStorage.setItem("idToken", "0");
    localStorage.setItem("username", "none");
    localStorage.setItem("role", "");
  };

  const finalizeFirebaseLogin = async (user) => {
    try {
      await syncMiloProfileAfterFirebaseAuth(user);
    } catch (syncErr) {
      await rollbackFirebaseSession();
      throw syncErr;
    }
  };

  // reCAPTCHA Enterprise site key
  const RECAPTCHA_SITE_KEY = "6LfGXDIsAAAAAILcLK1xmSF0nlNsdutCliLF5EhN";

  // Get reCAPTCHA Enterprise token
  const getRecaptchaToken = async (action = "LOGIN") => {
    return new Promise((resolve, reject) => {
      if (typeof window.grecaptcha === "undefined" || !window.grecaptcha.enterprise) {
        reject(new Error("reCAPTCHA Enterprise not loaded"));
        return;
      }

      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            RECAPTCHA_SITE_KEY,
            { action }
          );
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  // Initialize reCAPTCHA when phone login is selected
  // CRITICAL: Use global window.recaptchaVerifier as per Firebase best practices
  // According to Firebase docs: https://firebase.google.com/docs/auth/web/phone-auth
  const initializeRecaptcha = () => {
    // Clear any existing global verifier first
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (clearError) {
        // Silently handle error
      }
      window.recaptchaVerifier = null;
    }

    // CRITICAL: Container MUST exist in DOM before initializing
    // The container is always rendered in JSX: <div id="recaptcha-container"></div>
    const container = document.getElementById("recaptcha-container");
    if (!container) {
      throw new Error(
        "reCAPTCHA container not found in DOM. " +
        "Ensure <div id='recaptcha-container'></div> is always rendered in the component."
      );
    }

    try {
      // CRITICAL: Create global RecaptchaVerifier on window object
      // This ensures reCAPTCHA persists across component re-renders
      // Firebase v9+ pattern: new RecaptchaVerifier(auth, container, options)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber
            },
            "expired-callback": () => {
              // Response expired, reCAPTCHA needs to be re-verified
              // Clear global verifier on expiration so it can be recreated
              if (window.recaptchaVerifier) {
                try {
                  window.recaptchaVerifier.clear();
                } catch (e) {
                  // Silently handle error
                }
                window.recaptchaVerifier = null;
              }
            },
          }
        );
      }
      
      return window.recaptchaVerifier;
    } catch (error) {
      throw new Error(`Failed to initialize reCAPTCHA: ${error.message}`);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get reCAPTCHA Enterprise token for login/signup
      try {
        const action = isLogin ? "LOGIN" : "SIGNUP";
        await getRecaptchaToken(action);
        // Token is obtained and validated, proceed with authentication
      } catch (recaptchaError) {
        // Continue with auth even if reCAPTCHA fails
      }

      if (isLogin) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        await finalizeFirebaseLogin(user);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await finalizeFirebaseLogin(user);
      }
      onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(
        error?.code ? getErrorMessage(error.code) : error?.message || getErrorMessage()
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Get reCAPTCHA Enterprise token for Google login
      try {
        await getRecaptchaToken("GOOGLE_LOGIN");
      } catch (recaptchaError) {
        // Continue with auth even if reCAPTCHA fails
      }

      const { user } = await signInWithPopup(auth, googleProvider);
      await finalizeFirebaseLogin(user);
      onClose();
    } catch (error) {
      setError(
        error?.code ? getErrorMessage(error.code) : error?.message || getErrorMessage()
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Get reCAPTCHA Enterprise token for Facebook login
      try {
        await getRecaptchaToken("FACEBOOK_LOGIN");
      } catch (recaptchaError) {
        // Continue with auth even if reCAPTCHA fails
      }

      const { user } = await signInWithPopup(auth, facebookProvider);
      await finalizeFirebaseLogin(user);
      onClose();
    } catch (error) {
      setError(
        error?.code ? getErrorMessage(error.code) : error?.message || getErrorMessage()
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate phone number before proceeding
      const phoneNumber = `+${countryCode}${phone}`;
      
      // Verify phone number format
      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error("Please enter a valid phone number");
      }
      
      if (!countryCode || !phone) {
        throw new Error("Please enter both country code and phone number");
      }
      
      // CRITICAL: Ensure reCAPTCHA container exists in DOM before proceeding
      // Container must be mounted: <div id="recaptcha-container"></div>
      const container = document.getElementById("recaptcha-container");
      if (!container) {
        throw new Error(
          "reCAPTCHA container not found in DOM. " +
          "The container must be rendered before calling signInWithPhoneNumber."
        );
      }
      
      // Initialize Firebase's RecaptchaVerifier (not Enterprise)
      // Firebase phone auth uses its own reCAPTCHA system
      const verifier = initializeRecaptcha();
      
      // Small delay to ensure reCAPTCHA is ready (especially on mobile)
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Call signInWithPhoneNumber as per Firebase documentation
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      setConfirmationResult(confirmation);
      setShowPhoneVerification(true);
    } catch (error) {
      console.error("Phone auth error:", {
        code: error?.code,
        message: error?.message,
        fullError: error,
      });
      // Handle specific Firebase errors
      const errorCode = error.code || error.message;
      setError(getErrorMessage(errorCode));
      
      // Clear reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (clearError) {
          // Silently handle error
        }
        window.recaptchaVerifier = null;
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
      const phoneUser = auth.currentUser;
      if (!phoneUser) {
        throw new Error("Phone sign-in did not complete.");
      }
      await finalizeFirebaseLogin(phoneUser);
      onClose();
      setPhone("");
      setCountryCode("");
      setVerificationCode("");
      setShowPhoneVerification(false);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (error) {
      setError(
        error?.code
          ? getErrorMessage(error.code)
          : error?.message || "Invalid verification code. Please try again."
      );
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
      case "auth/invalid-app-credential":
        return "Firebase app credentials are invalid. Verify REACT_APP_FIREBASE_API_KEY and REACT_APP_FIREBASE_APP_ID match the exact values from Firebase Console > Project settings > Your apps (Web app).";
      case "auth/app-not-authorized":
        return "This domain is not authorized for Firebase Authentication. Add the current domain in Firebase Console > Authentication > Settings > Authorized domains.";
      case "auth/quota-exceeded":
        return "Phone authentication quota exceeded. Please try again later.";
      case "auth/captcha-check-failed":
      case "CAPTCHA_CHECK_FAILED":
        return "reCAPTCHA verification failed. The domain may not be authorized. Please contact support if this persists.";
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
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
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

                <div className="divider">
                  <span>OR</span>
                </div>

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

            {/* CRITICAL: reCAPTCHA container MUST always be in DOM */}
            {/* Do not conditionally render - must be mounted before signInWithPhoneNumber */}
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </StyledLoginModal>
  );
};

export default LoginModal;

