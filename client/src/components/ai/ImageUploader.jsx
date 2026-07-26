import { useRef, useState } from "react";
import {
  FaImage,
  FaTrash,
  FaUpload,
  FaSearchPlus,
} from "react-icons/fa";

function ImageUploader({
  onImageSelect,
}) {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

    onImageSelect?.(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onImageSelect?.(null);
  };

  return (
    <div className="image-card">

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleSelect}
      />

      {!image ? (
        <div
          className="upload-box"
          onClick={() =>
            inputRef.current.click()
          }
        >
          <FaUpload className="upload-icon" />

          <h3>Upload Image</h3>

          <p>
            Click to upload an image
            for AI analysis
          </p>

        </div>
      ) : (
        <>
          <img
            src={preview}
            alt="preview"
            className="image-preview"
          />

          <div className="image-footer">

            <div>

              <h4>{image.name}</h4>

              <small>
                {(image.size / 1024).toFixed(2)}
                KB
              </small>

            </div>

            <div className="image-actions">

              <button
                onClick={() =>
                  window.open(preview)
                }
              >
                <FaSearchPlus />
              </button>

              <button
                className="delete-btn"
                onClick={removeImage}
              >
                <FaTrash />
              </button>

            </div>

          </div>

          <div className="upload-progress">

            <div
              className="upload-fill"
            ></div>

          </div>

          <span className="upload-status">
            Upload Complete
          </span>
        </>
      )}

    </div>
  );
}

export default ImageUploader;