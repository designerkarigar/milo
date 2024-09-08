import { FadeLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { BaseUrlS3 } from "../../utils/Constants/Url";

import {
  CContainer,
  CRow,
  CCard,
  CCardBody,
  CCardImage,
  CButtonGroup,
  CButton,
} from "@coreui/react";

const PortalBlogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([
    {
      uid: "",
      photos: [
        {
          type: "icon",
          url: "",
        },
      ],
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const BlogData = await getBlogs(1000);
        setBlogData(BlogData);
        setLoading(false);
      } catch (error) {
        alert(error);
        navigate("/login");
      }
    };
    getData();
  }, []);

  const handleClick = (uid) => {
    navigate(`/dashboard/BlogView?id=${uid}`);
  };

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
  } else {
    return (
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center 
          flex-column
          "
      >
        <CRow className="w-100">
          {blogData.map((data, index) => (
            <CCard
              key={data.uid}
              style={{ width: "300px", margin: "10px" }}
              onClick={() => handleClick(data.uid)}
            >
              <CCardImage
                src={
                  BaseUrlS3 +
                  (
                    data.photos.find(
                      (photoData) => photoData.type === "banner"
                    ) || {}
                  ).url
                }
                orientation="top"
                className="mb-0"
                style={{ padding: "50%" }}
              />
              <CCardBody>
                <p>{data.title}</p>
              </CCardBody>
            </CCard>
          ))}
        </CRow>

        <CRow className="justify-content-center mt-3 mb-3">
          <CButtonGroup role="group" aria-label="Basic example">
            <CButton
              color="primary"
              variant="outline"
              onClick={() => navigate(`/dashboard/BlogView?id=0`)}
            >
              Create Blog
            </CButton>
          </CButtonGroup>
        </CRow>
      </CContainer>
    );
  }
};

export default PortalBlogs;

// return (
//   <>
//     {blogData.map((data, index) => (
//       <Link
//         to={`newportalview?id=${data.uid}`}
//         className="link"
//         key={index}
//       >
//         <Card
//           imgSrc={
//             BaseUrlS3 +
//             (
//               data.photos.find(
//                 (photoData) => photoData.type === "banner"
//               ) || {}
//             ).url
//           }
//           heading={data.title}
//           key={index}
//           id={data.uid}
//         ></Card>
//       </Link>
//     ))}

//     <div className="center-button-portal">
//       <Link to="newportalview?id=0">
//         <button>ADD</button>
//       </Link>
//     </div>
//   </>
// );
// }
// };
