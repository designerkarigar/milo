import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { isValid } from "../Others/isValid";
import { SetValueInLocalStorage, Union } from "../Others/Setter_GetterLocalStorage";

function splitDisplayName(displayName) {
  const trimmed = (displayName || "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, idx),
    lastName: trimmed.slice(idx + 1).trim(),
  };
}

/** Same JSON shape as mobile `RegisterUserAccountCall` for Guest → registered. */
export function buildRegisterPayloadFromFirebaseUser(user) {
  let firstName = "";
  let lastName = "";
  if (user?.displayName) {
    const split = splitDisplayName(user.displayName);
    firstName = split.firstName;
    lastName = split.lastName;
  }
  const email = user?.email || "";
  if (!firstName && email.includes("@")) {
    firstName = email.split("@")[0] || "";
  }
  if (!firstName) firstName = "User";
  const mobile = user?.phoneNumber || "";
  return { firstName, lastName, email, mobile };
}

function wrapAxiosError(err) {
  if (!axios.isAxiosError(err)) return err;
  const body = err.response?.data;
  const msg =
    (typeof body === "string" && body) ||
    body?.message ||
    body?.error ||
    err.message;
  return new Error(msg || "Could not sync your account with the server.");
}

async function fetchLoggedInRecord(idToken) {
  try {
    const { data } = await axios.get(`${BaseUrl}/loggedInUser`, {
      headers: { token: idToken },
    });
    return data?.response?.record ?? null;
  } catch (err) {
    throw wrapAxiosError(err);
  }
}

/**
 * After Firebase sign-in: fresh ID token, GET /v1/loggedInUser, POST /v1/user if userName is Guest.
 * Updates local session keys used across the web app (`idToken`, `username`, `role`).
 */
export async function syncMiloProfileAfterFirebaseAuth(user) {
  if (!user) {
    throw new Error("No Firebase user");
  }

  const idToken = await user.getIdToken(true);
  localStorage.setItem("idToken", idToken);

  let record = await fetchLoggedInRecord(idToken);
  if (!record) {
    throw new Error("Unable to load account from server.");
  }

  if (record.userName === "Guest") {
    const body = buildRegisterPayloadFromFirebaseUser(user);
    try {
      await axios.post(`${BaseUrl}/user`, body, {
        headers: {
          token: idToken,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
    } catch (err) {
      throw wrapAxiosError(err);
    }
    record = await fetchLoggedInRecord(idToken);
    if (!record) {
      throw new Error("Unable to load account after registration.");
    }
  }

  if (record.userName != null && record.userName !== "") {
    localStorage.setItem("username", record.userName);
  }
  if (record.role !== undefined && record.role !== null) {
    localStorage.setItem("role", String(record.role));
  }

  SetValueInLocalStorage("token", Union);
  isValid();

  return record;
}
