import React, { useEffect, useRef, useState } from "react";
import { StyledPortal } from "./styledComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlogByID } from "../../utils/Functions/Blogs/getBlogByID";
import { deleteBlog } from "../../utils/Functions/Blogs/deleteBlog";
import { uploadBlog } from "../../utils/Functions/Blogs/uploadBlog";
import { updateBlog } from "../../utils/Functions/Blogs/updateBlog";
import { ToolBarFormats } from "../../utils/Constants/QuillFormats/ToolBarFormats";
import { convertTo64 } from "../../utils/Functions/Others/Convert";
import { fetchContent } from "../../utils/Functions/Blogs/fetchContent";
import { ImageExtract } from "../../utils/Functions/Blogs/ImageExtracter";
import { getHeading } from "../../utils/Functions/Blogs/getHeading";
import { toolbar } from "../../utils/Constants/QuillFormats/toolBarOptions";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { uploadImage } from "../../utils/Functions/Others/uploadImage";

export const PortalView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [value, setValue] = useState("loading ...");

  const quillRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(quillRef.current, {
      modules: {
        toolbar: toolbar,
      },
      formats: ToolBarFormats,
      placeholder: "Start Typing...",
      theme: "snow",
    });

    quill.on("text-change", async function (delta, source) {
      console.log(delta, source);

      delta.ops.forEach(async (op) => {
        if (op?.insert?.image) {
          try {
            if (op?.insert?.image?.startsWith("https")) {
              return;
            } else {
              console.log("uploading");
              const res = await uploadImage(op.insert.image);
              op.insert.image = res;
              // quill.insertEmbed("image", res);
              // quill.setContents(delta, source);
              quill.updateContents(delta, source);
            }
          } catch (err) {
            alert(err);
          }
        }
      });
    });

    if (id === "0") {
      setValue("");
    } else {
      const getData = async () => {
        try {
          const data = await getBlogByID(id);
          const photo = data.photos.find((photo) => photo.type === "content");
          const content = await fetchContent(photo.url);
          setValue(content);
          quill.setContents(quill.clipboard.convert(content));
        } catch (err) {
          alert(err);
          navigate("/dashboard/portal");
        }
      };
      getData();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const htmlContent = quillRef.current.firstChild.innerHTML;

    console.log(htmlContent);
    // const base64image = await ImageExtract(value);
    // const content = await convertTo64(value);

    // const data = {
    //   heading: getHeading(value),
    //   base64image: base64image,
    //   content: content,
    // };

    // if (id === "0") {
    //   try {
    //     await uploadBlog(data);
    //     navigate("/dashboard/portal");
    //   } catch (error) {
    //     alert("Error Uploading :- " + error);
    //   }
    // } else {
    //   try {
    //     await updateBlog(data, id);
    //     navigate("/dashboard/portal");
    //   } catch (error) {
    //     alert("Error Updating" + error);
    //   }
    // }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (id !== "0") {
      await deleteBlog(id);
      alert("Blog deleted");
      navigate("/dashboard/portal_blogs");
    } else {
      alert("No blog exist yet");
    }
  };

  return (
    <>
      <StyledPortal>
        <div ref={quillRef} className="editor"></div>
        <div className="Buttons">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </StyledPortal>
    </>
  );
};
