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
import { getHeading } from "../../utils/Functions/Blogs/getHeading";
import { toolbar } from "../../utils/Constants/QuillFormats/toolBarOptions";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { uploadImage } from "../../utils/Functions/Others/uploadImage";

function decodeBase64Html(base64Text) {
  if (!base64Text || typeof base64Text !== "string") return "";
  try {
    return decodeURIComponent(escape(atob(base64Text)));
  } catch {
    try {
      return atob(base64Text);
    } catch {
      return "";
    }
  }
}

function normalizeS3ImageUrls(html) {
  if (!html || typeof html !== "string") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));

  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || (!src.startsWith("http://") && !src.startsWith("https://"))) return;

    try {
      const parsed = new URL(src);
      const host = parsed.hostname;
      const path = parsed.pathname;
      if (host.includes("s3.")) {
        img.setAttribute("src", `${parsed.protocol}//${host}${path}`);
      }
    } catch {
      // Ignore malformed src values.
    }
  });

  return doc.body.innerHTML;
}

export const PortalView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [value, setValue] = useState("loading ...");
  const [blogTitle, setBlogTitle] = useState("");

  const quillRef = useRef(null);
  const isReplacingImageRef = useRef(false);
  const pendingUploadsRef = useRef(new Set());

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
      if (source !== "user" || isReplacingImageRef.current) return;

      console.log(delta, source);

      let index = 0;
      for (const op of delta.ops) {
        if (op?.retain) {
          index += op.retain;
          continue;
        }

        if (op?.insert?.image) {
          try {
            const localImageSrc = op?.insert?.image;

            if (
              localImageSrc?.startsWith("https://") ||
              localImageSrc?.startsWith("http://")
            ) {
              index += 1;
              continue;
            }

            if (pendingUploadsRef.current.has(localImageSrc)) {
              index += 1;
              continue;
            }

            pendingUploadsRef.current.add(localImageSrc);
            console.log("uploading");
            const uploadedUrl = await uploadImage(localImageSrc);

            isReplacingImageRef.current = true;
            quill.deleteText(index, 1, "silent");
            quill.insertEmbed(index, "image", uploadedUrl, "silent");
            quill.setSelection(index + 1, 0, "silent");
            isReplacingImageRef.current = false;

            pendingUploadsRef.current.delete(localImageSrc);
            index += 1;
          } catch (err) {
            isReplacingImageRef.current = false;
            pendingUploadsRef.current.delete(op?.insert?.image);
            alert(err);
          }
          continue;
        }

        if (typeof op?.insert === "string") {
          index += op.insert.length;
        } else if (op?.insert) {
          index += 1;
        }
      }
    });

    if (id === "0") {
      setValue("");
    } else {
      const getData = async () => {
        try {
          const data = await getBlogByID(id);
          setBlogTitle(data?.title || "");
          const photo =
            data?.photos?.find((item) => item?.type === "content") ||
            data?.photos?.[0];
          const inlineHtml =
            decodeBase64Html(data?.content) || decodeBase64Html(photo?.image);
          if (!inlineHtml && !photo?.url) {
            throw new Error("Blog content file is missing");
          }
          const content = inlineHtml || (await fetchContent(photo.url));
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

    const htmlContent =
      quillRef.current?.querySelector(".ql-editor")?.innerHTML ?? "";
    const normalizedHtmlContent = normalizeS3ImageUrls(htmlContent);

    try {
      const content = await convertTo64(normalizedHtmlContent);
      const data = {
        heading: blogTitle.trim() || getHeading(normalizedHtmlContent),
        content,
        rawHtml: normalizedHtmlContent,
      };

      if (id === "0") {
        await uploadBlog(data);
      } else {
        await updateBlog(data, id);
      }
      navigate("/dashboard/portal_blogs");
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message ??
        error?.message ??
        String(error);
      alert(`Error saving blog: ${message}`);
    }
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
        <input
          type="text"
          placeholder="Enter blog title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          style={{
            maxWidth: "900px",
            width: "100%",
            marginBottom: "16px",
            padding: "12px 14px",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            fontSize: "16px",
          }}
        />
        <div ref={quillRef} className="editor"></div>
        <div className="Buttons">
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </StyledPortal>
    </>
  );
};
