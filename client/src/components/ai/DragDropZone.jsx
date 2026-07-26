import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaFile,
  FaImage,
  FaTimes,
} from "react-icons/fa";

function DragDropZone({
  onFilesSelected,
}) {
  const [dragging, setDragging] = useState(false);

  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    const list = Array.from(selectedFiles);

    setFiles(list);

    onFilesSelected?.(list);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    const updated = [...files];

    updated.splice(index, 1);

    setFiles(updated);

    onFilesSelected?.(updated);
  };

  return (
    <div>

      <div
        className={`drop-zone ${
          dragging ? "drag-active" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={handleDrop}
      >

        <FaCloudUploadAlt
          className="drop-icon"
        />

        <h3>
          Drag & Drop Files Here
        </h3>

        <p>
          Upload Images, PDFs,
          Word, Excel or Text Files
        </p>

        <label
          htmlFor="upload-files"
          className="browse-btn"
        >
          Browse Files
        </label>

        <input
          id="upload-files"
          hidden
          multiple
          type="file"
          onChange={(e) =>
            handleFiles(
              e.target.files
            )
          }
        />

      </div>

      {files.length > 0 && (
        <div className="file-list">

          {files.map((file, index) => (

            <div
              className="drop-file-card"
              key={index}
            >

              <div className="drop-left">

                {file.type.startsWith(
                  "image"
                ) ? (
                  <FaImage />
                ) : (
                  <FaFile />
                )}

                <div>

                  <h4>
                    {file.name}
                  </h4>

                  <small>
                    {(
                      file.size /
                      1024
                    ).toFixed(1)}
                    {" "}KB
                  </small>

                </div>

              </div>

              <button
                className="remove-drop-file"
                onClick={() =>
                  removeFile(index)
                }
              >
                <FaTimes />
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default DragDropZone;