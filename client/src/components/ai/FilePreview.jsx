import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaFileAlt,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaImage,
  FaFile,
  FaTrash,
} from "react-icons/fa";

function FilePreview({
  file,
  progress = 100,
  onRemove,
}) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) return;

    if (file.type.startsWith("image")) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!file) return null;

  const getIcon = () => {
    if (file.type.includes("pdf"))
      return <FaFilePdf color="#ef4444" />;

    if (file.type.includes("word"))
      return <FaFileWord color="#2563eb" />;

    if (
      file.type.includes("excel") ||
      file.type.includes("sheet")
    )
      return <FaFileExcel color="#16a34a" />;

    if (
      file.type.includes("zip") ||
      file.type.includes("rar")
    )
      return <FaFileArchive color="#f59e0b" />;

    if (file.type.includes("text"))
      return <FaFileAlt color="#38bdf8" />;

    if (file.type.startsWith("image"))
      return <FaImage color="#8b5cf6" />;

    return <FaFile color="#94a3b8" />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024)
      return bytes + " B";

    if (bytes < 1024 * 1024)
      return (
        (bytes / 1024).toFixed(1) +
        " KB"
      );

    return (
      (bytes / 1024 / 1024).toFixed(2) +
      " MB"
    );
  };

  return (
    <div className="file-preview">

      <div className="file-top">

        <div className="file-left">

          <div className="file-icon">
            {getIcon()}
          </div>

          <div className="file-details">

            <h4>{file.name}</h4>

            <span>
              {formatSize(file.size)}
            </span>

          </div>

        </div>

        <button
          className="remove-file"
          onClick={onRemove}
        >
          <FaTrash />
        </button>

      </div>

      {preview && (
        <img
          src={preview}
          alt={file.name}
          className="preview-image"
        />
      )}

      <div className="upload-progress">

        <div
          className="upload-bar"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="upload-text">
        {progress}% Uploaded
      </div>

    </div>
  );
}

export default FilePreview;