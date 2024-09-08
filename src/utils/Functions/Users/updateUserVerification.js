import { BaseUrl } from "../../Constants/Url";

export const updateUserVerification = async (type, userName, status) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    let url = "";
    switch (type) {
      case "creches":
        url = `${BaseUrl}/admin/verify/creches?uid=${userName}&verified=${status}`;
        break;

      case "vets":
        url = `${BaseUrl}/admin/verify/vets?uid=${userName}&verified=${status}`;
        break;

      case "user":
        url = `${BaseUrl}/admin/verify/user?userName=${userName}&verified=${status}`;
        break;

      default:
        break;
    }

    await fetch(url, {
      method: "PUT",
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
      },
    });

    return;
  } catch (err) {
    throw new Error(err);
  }
};
