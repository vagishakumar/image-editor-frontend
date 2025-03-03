import React, { useState } from "react";
import PropTypes from "prop-types";

import "./CSS/CanvasEditor.css";

const CanvasEditor = ({ imageSrc, onReplace }) => {
  if (imageSrc.length === 0) return null;
  return (
    <div className="canvas-editor-container">
      <div className="image-grid">
        {imageSrc.map((imgObj) => (
          <ImageBlock
            key={imgObj.id}
            src={imgObj.url}
            download={imgObj.download}
            onReplace={() => onReplace(imgObj.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Component for each image inside a fixed box
const ImageBlock = ({ src, download, onReplace }) => {
  const [loading, setLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleDownload = async () => {
    if (download) {
      window.open(download, "_blank");
    } else {
      let url = downloadUrl;

      if (!url) {
        url = await getUrl();
      }

      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  async function getUrl() {
    try {
      const response = await fetch(src, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);
      return blobUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  return (
    <div className="image-block">
      <div className="image-box relative">
        {loading && <div className="loading loading--full-height"></div>}
        <img
          src={src}
          alt="Uploaded"
          className={`image ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
        />

        <div className="button-group-2">
          <button
            className="button-1"
            onClick={() => {
              handleDownload();
            }}
          >
            Download
          </button>
          <button className="button-1" onClick={onReplace}>
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;

CanvasEditor.propTypes = {
  imageSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onReplace: PropTypes.func.isRequired,
};
ImageBlock.propTypes = {
  onReplace: PropTypes.func.isRequired,
  src: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
