import { useEffect, useState } from "react";
import {
  FaPaperclip,
  FaTrash,
  FaFilePdf,
  FaFileWord,
  FaFileImage
} from "react-icons/fa";

import "./Attachments.css";

function Attachments({ taskId }) {

  const storageKey = `attachments_${taskId}`;

  const [files, setFiles] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setFiles(saved);

  }, [storageKey]);

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      JSON.stringify(files)
    );

  }, [files, storageKey]);

  const uploadFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      const attachment = {

        id: Date.now(),

        name: file.name,

        type: file.type,

        size: (file.size / 1024).toFixed(1),

        data: reader.result

      };

      setFiles([attachment, ...files]);

    };

    reader.readAsDataURL(file);

  };

  const deleteFile = (id) => {

    setFiles(files.filter(file => file.id !== id));

  };

  const fileIcon = (type) => {

    if(type.includes("image"))
      return <FaFileImage className="image-icon"/>;

    if(type.includes("pdf"))
      return <FaFilePdf className="pdf-icon"/>;

    if(type.includes("word"))
      return <FaFileWord className="word-icon"/>;

    return <FaPaperclip />;

  };

  return (

    <div className="attachments">

      <h2>📎 Attachments</h2>

      <label className="upload-btn">

        Upload File

        <input
          type="file"
          hidden
          onChange={uploadFile}
        />

      </label>

      <div className="attachment-list">

        {

          files.length===0 ?

          <p>No attachments</p>

          :

          files.map(file=>(

            <div
              className="attachment-card"
              key={file.id}
            >

              <div className="left">

                {fileIcon(file.type)}

                <div>

                  <h4>{file.name}</h4>

                  <small>{file.size} KB</small>

                </div>

              </div>

              <div className="right">

                {

                  file.type.includes("image") &&

                  <a
                    href={file.data}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Preview
                  </a>

                }

                <a
                  href={file.data}
                  download={file.name}
                >
                  Download
                </a>

                <button
                  onClick={() => deleteFile(file.id)}
                >
                  <FaTrash/>
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Attachments;