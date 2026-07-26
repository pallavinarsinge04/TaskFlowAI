import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
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

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreview("");
  }, [file]);

  if (!file) return null;

  const getIcon = () => {
    if (file.type.includes("pdf")) return <FaFilePdf />;
    if (file.type.includes("word")) return <FaFileWord />;
    if (file.type.includes("sheet") || file.type.includes("excel"))
      return <FaFileExcel />;
    if (file.type.includes("text")) return <FaFileAlt />;
    if (file.type.includes("zip") || file.type.includes("rar"))
      return <FaFileArchive />;
    if (file.type.startsWith("image/")) return <FaImage />;

    return <FaFile />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="file-preview">

      <div className="file-header">

        <div className="file-left">

          <div className="file-icon">
            {getIcon()}
          </div>

          <div>
            <h4>{file.name}</h4>
            <p>{formatSize(file.size)}</p>
          </div>

        </div>

        <button
          className="remove-btn"
          onClick={onRemove}
        >
          <FaTrash />
        </button>

      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="preview-image"
        />
      )}

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <small>{progress}% Uploaded</small>

    </div>
  );
}

export default FilePreview;