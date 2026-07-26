import { useEffect, useRef, useState } from "react";
import {
  FaImage,
  FaTrash,
  FaUpload,
  FaEye,
} from "react-icons/fa";

function ImageUploader({
  onImageSelect,
  uploadProgress = 100,
}) {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) return;

    const url = URL.createObjectURL(image);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setImage(file);

    onImageSelect?.(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-upload-card">

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {!image ? (
        <div
          className="upload-area"
          onClick={() =>
            fileInputRef.current.click()
          }
        >
          <FaUpload className="upload-icon" />

          <h3>Upload Image</h3>

          <p>
            Click here to upload an image for
            Gemini Vision analysis.
          </p>

        </div>
      ) : (
        <>
          <img
            src={preview}
            alt="Preview"
            className="preview-image"
          />

          <div className="image-info">

            <div>

              <h4>{image.name}</h4>

              <small>
                {(image.size / 1024).toFixed(1)}
                {" "}KB
              </small>

            </div>

            <div className="image-actions">

              <button
                title="Preview"
                onClick={() =>
                  window.open(preview)
                }
              >
                <FaEye />
              </button>

              <button
                title="Delete"
                className="delete-btn"
                onClick={removeImage}
              >
                <FaTrash />
              </button>

            </div>

          </div>

          <div className="upload-progress">

            <div
              className="upload-bar"
              style={{
                width: `${uploadProgress}%`,
              }}
            />

          </div>

          <div className="upload-status">
            {uploadProgress}% Uploaded
          </div>
        </>
      )}

    </div>
  );
}

export default ImageUploader;