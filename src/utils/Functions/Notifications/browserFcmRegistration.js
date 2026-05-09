import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import app from "../../../firebase";
import { updateDeviceDetails } from "./updateDeviceDetails";

const DEVICE_ID_KEY = "milo_device_id";
const LAST_TOKEN_KEY = "milo_fcm_token";

function randomUuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  // fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateDeviceId() {
  const existing = localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const id = randomUuid();
  localStorage.setItem(DEVICE_ID_KEY, id);
  return id;
}

function getBrowserMetadata() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const resolution =
    typeof window !== "undefined" && window.screen
      ? `${window.screen.width}x${window.screen.height}`
      : "";
  return {
    type: "BROWSER",
    os: platform,
    model: "Chrome",
    resolution,
    userAgent: ua,
  };
}

export async function registerBrowserFcmToken(userName) {
  if (!(await isSupported().catch(() => false))) {
    return { ok: false, reason: "messaging_not_supported" };
  }
  if (!("Notification" in window)) {
    return { ok: false, reason: "notifications_not_supported" };
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return { ok: false, reason: "permission_denied" };
  }

  const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY || "";
  if (!vapidKey) {
    return { ok: false, reason: "missing_vapid_key" };
  }

  const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  const messaging = getMessaging(app);
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: swReg });
  if (!token) return { ok: false, reason: "missing_token" };

  localStorage.setItem(LAST_TOKEN_KEY, token);

  const deviceId = getOrCreateDeviceId();
  const now = Date.now();
  const payload = {
    tokenId: token,
    deviceId,
    ...getBrowserMetadata(),
    addedAt: now,
    lastActiveAt: now,
  };
  // Optional: include userName if you have it (backend should also infer from JWT)
  if (userName) payload.userName = userName;

  await updateDeviceDetails(payload);

  // Foreground message logging (optional).
  try {
    onMessage(messaging, () => {});
  } catch {
    // ignore
  }

  return { ok: true, token };
}

