import { BaseUrl } from "../../../Constants/Url";

export const manageBookings = async (status, uid) => {
  const idToken = localStorage.getItem("idToken");
  console.log(idToken);
  console.log(status);
  console.log(uid);

  const headers = new Headers();
  headers.append("token", idToken);

  const requestOptions = {
    method: "PUT",
    headers: headers,
  };

  console.log(requestOptions);
  try {
    const response = await fetch(
      `${BaseUrl}/manageBookings/updateStatus?uid=${uid}&status=${status}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Error while updating status");
    }
  } catch (err) {
    throw err;
  }
};
