/**
 * Firebase Configuration Diagnostics
 * Run this in browser console to diagnose Firebase configuration issues
 */

export const diagnoseFirebaseConfig = () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    origin: window.location.origin,
    hostname: window.location.hostname,
    issues: [],
    recommendations: [],
  };

  // Check environment variables
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const appId = process.env.REACT_APP_FIREBASE_APP_ID;

  if (!apiKey) {
    diagnostics.issues.push("REACT_APP_FIREBASE_API_KEY is missing");
    diagnostics.recommendations.push(
      "Set REACT_APP_FIREBASE_API_KEY in AWS Amplify environment variables"
    );
  } else {
    diagnostics.apiKey = `${apiKey.substring(0, 10)}...`;
    if (!apiKey.startsWith("AIza")) {
      diagnostics.issues.push("API key format looks invalid");
      diagnostics.recommendations.push(
        "Verify API key matches Firebase Console → Project Settings → General → Your apps"
      );
    }
  }

  if (!appId) {
    diagnostics.issues.push("REACT_APP_FIREBASE_APP_ID is missing");
    diagnostics.recommendations.push(
      "Set REACT_APP_FIREBASE_APP_ID in AWS Amplify environment variables"
    );
  } else {
    diagnostics.appId = appId;
    if (!/^\d+:\d+:web:[a-zA-Z0-9]+$/.test(appId)) {
      diagnostics.issues.push("App ID format looks invalid");
      diagnostics.recommendations.push(
        "Use full web App ID format: 1:<sender-id>:web:<hash>"
      );
    }
  }

  // Check reCAPTCHA Enterprise
  if (typeof window.grecaptcha === "undefined") {
    diagnostics.issues.push("reCAPTCHA Enterprise script not loaded");
    diagnostics.recommendations.push(
      "Ensure reCAPTCHA Enterprise script is loaded in index.html"
    );
  } else if (!window.grecaptcha.enterprise) {
    diagnostics.issues.push("reCAPTCHA Enterprise API not available");
    diagnostics.recommendations.push(
      "Check reCAPTCHA Enterprise script URL and site key"
    );
  } else {
    diagnostics.recaptchaLoaded = true;
  }

  // Check domain authorization
  if (window.location.hostname !== "localhost" && window.location.hostname !== "milo.social") {
    diagnostics.issues.push(`Unexpected hostname: ${window.location.hostname}`);
    diagnostics.recommendations.push(
      "Ensure domain is authorized in Firebase Console → Authentication → Settings → Authorized domains"
    );
  }

  // Generate report
  console.group("🔍 Firebase Configuration Diagnostics");
  console.log("Environment:", diagnostics.environment);
  console.log("Origin:", diagnostics.origin);
  console.log("Hostname:", diagnostics.hostname);
  
  if (diagnostics.issues.length === 0) {
    console.log("✅ No issues detected");
  } else {
    console.warn("⚠️ Issues found:", diagnostics.issues);
    console.info("💡 Recommendations:", diagnostics.recommendations);
  }
  
  console.log("Full diagnostics:", diagnostics);
  console.groupEnd();

  return diagnostics;
};

// Auto-run in development
if (process.env.NODE_ENV === "development") {
  // Run after a short delay to ensure Firebase is initialized
  setTimeout(() => {
    if (typeof window !== "undefined") {
      diagnoseFirebaseConfig();
    }
  }, 1000);
}

