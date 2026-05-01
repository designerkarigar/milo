import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { resolveS3Url } from "../../utils/Functions/Others/resolveS3Url";
import { getBlogThumbnailUrl } from "../../utils/Functions/Blogs/getBlogThumbnailUrl";

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
  const [blogData, setBlogData] = useState([]);
  const defaultThumbnail = "https://via.placeholder.com/300x200?text=No+Image";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const BlogData = await getBlogs();
        const withThumbnails = await Promise.all(
          (BlogData || []).map(async (item) => {
            const thumbnailUrl = await getBlogThumbnailUrl(
              item,
              defaultThumbnail
            );
            return { ...item, thumbnailUrl };
          })
        );
        setBlogData(withThumbnails);
      } catch (error) {
        alert(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [navigate]);

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
        {blogData.length === 0 ? (
          <div className="text-center py-5">
            <p>No blogs found. Click "Create Blog" to add a new blog.</p>
          </div>
        ) : (
          <CRow className="w-100">
            {blogData.map((data, index) => (
              <CCard
                key={data.uid || index}
                style={{ width: "300px", margin: "10px", cursor: "pointer" }}
                onClick={() => handleClick(data.uid)}
              >
                <CCardImage
                  src={resolveS3Url(data.thumbnailUrl || defaultThumbnail)}
                  orientation="top"
                  className="mb-0"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = defaultThumbnail;
                  }}
                />
                <CCardBody>
                  <h6>{data.title || "Untitled Blog"}</h6>
                  {data.description && (
                    <p className="text-muted small mb-0" style={{ 
                      overflow: "hidden", 
                      textOverflow: "ellipsis", 
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {data.description}
                    </p>
                  )}
                </CCardBody>
              </CCard>
            ))}
          </CRow>
        )}

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
