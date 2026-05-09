/* eslint-disable no-undef */
// Firebase Messaging Service Worker for web push notifications.
// Note: Firebase config is not secret; it's required for FCM on web.

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCYlmxnQzbhZ9hFArTifCIUr4-vLEjqXx8",
  authDomain: "miloapp-d189a.firebaseapp.com",
  projectId: "miloapp-d189a",
  storageBucket: "miloapp-d189a.appspot.com",
  messagingSenderId: "618712475427",
  appId: "1:618712475427:web:f1bc181eee2483ac744e96",
  measurementId: "G-S199WPTLLQ",
});

const messaging = firebase.messaging();

// Show a notification when a push arrives in background.
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || payload?.data?.title || "Milo";
  const body = payload?.notification?.body || payload?.data?.body || "";
  const icon = payload?.notification?.icon || "/favicon.ico";

  self.registration.showNotification(title, {
    body,
    icon,
    data: payload?.data || {},
  });
});

