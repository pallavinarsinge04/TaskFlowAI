import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaFile,
  FaImage,
  FaTrash,
} from "react-icons/fa";

function DragDropZone({
  onFilesChange,
}) {
  const [dragging, setDragging] =
    useState(false);

  const [files, setFiles] =
    useState([]);

  const handleFiles = (fileList) => {
    const selected = Array.from(fileList);

    setFiles(selected);

    onFilesChange?.(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    const updated = [...files];

    updated.splice(index, 1);

    setFiles(updated);

    onFilesChange?.(updated);
  };

  return (
    <div>

      <div
        className={`drag-drop ${
          dragging ? "active" : ""
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

        <FaCloudUploadAlt className="drop-icon" />

        <h2>
          Drag & Drop Files
        </h2>

        <p>
          Upload Images, PDFs,
          Word, Excel or Text Files
        </p>

        <label
          htmlFor="files"
          className="browse-button"
        >
          Browse Files
        </label>

        <input
          hidden
          id="files"
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

        <div className="uploaded-files">

          {files.map((file, index) => (

            <div
              key={index}
              className="file-item"
            >

              <div className="file-left">

                {file.type.startsWith(
                  "image/"
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
                      file.size / 1024
                    ).toFixed(2)}
                    KB
                  </small>

                </div>

              </div>

              <button
                className="delete-file"
                onClick={() =>
                  removeFile(index)
                }
              >
                <FaTrash />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default DragDropZone;