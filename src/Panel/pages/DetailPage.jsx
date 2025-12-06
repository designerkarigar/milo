import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { getVetDetails } from "../../utils/Functions/Vets/getVetDetails";
import getCrecheDetails from "../../utils/Functions/creche/getCrecheDetails";
import getNGODetails from "../../utils/Functions/ngo/getNGODetails";
import getServiceDetails from "../../utils/Functions/services/getServiceDetails";
import VetDetailPage from "./DetailComponents/VetDetailPage";
import CrecheDetailPage from "./DetailComponents/CrecheDetailPage";
import NGODetailPage from "./DetailComponents/NGODetailPage";
import ServiceProviderDetailPage from "./DetailComponents/ServiceProviderDetailPage";

const DetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const userName = queryParams.get("uid");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (type === "vets") {
          const userdata = await getVetDetails(userName);
          setData(userdata);
          setLoading(false);
        }
        if (type === "creches") {
          const userdata = await getCrecheDetails(userName);
          setData(userdata);
          setLoading(false);
        }
        if (type === "ngo") {
          const userdata = await getNGODetails(userName);
          // Extract profile photo from photos array if profilePhoto doesn't exist
          if (!userdata.profilePhoto && userdata.photos && Array.isArray(userdata.photos)) {
            const profilePhotoObj = userdata.photos.find(photo => photo.isProfile);
            if (profilePhotoObj) {
              userdata.profilePhoto = profilePhotoObj.url;
            }
          }
          setData(userdata);
          setLoading(false);
        }
        if (type === "serviceProviders") {
          const userdata = await getServiceDetails(userName);
          // Extract profile photo from photos array if profilePhoto doesn't exist
          if (!userdata.profilePhoto && userdata.photos && Array.isArray(userdata.photos)) {
            const profilePhotoObj = userdata.photos.find(photo => photo.isProfile);
            if (profilePhotoObj) {
              userdata.profilePhoto = profilePhotoObj.url;
            }
          }
          setData(userdata);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setLoading(false);
      }
    })();
  }, [type, userName]);

  if (loading) {
    return (
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <FadeLoader color="#00a3da" />
      </CContainer>
    );
  }

  switch (type) {
    case "vets":
      return <VetDetailPage data={data} />;
    case "creches":
      return <CrecheDetailPage data={data} />;
    case "ngo":
      return <NGODetailPage data={data} />;
    case "serviceProviders":
      return <ServiceProviderDetailPage data={data} />;
    default:
      return (
        <CContainer fluid>
          <p>Invalid type specified</p>
        </CContainer>
      );
  }
};

export default DetailPage;
