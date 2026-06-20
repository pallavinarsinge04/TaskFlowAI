import { useState } from "react";
import axios from "axios";

const FileUpload = ({ taskId }) => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("taskId", taskId);

    await axios.post(
      "http://localhost:5000/api/attachments",
      formData
    );

    alert("File Uploaded");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-5">

      <h2 className="text-xl font-bold mb-3">
        📎 Attach File
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={upload}
        className="bg-green-600 text-white px-5 py-2 rounded mt-3"
      >
        Upload
      </button>

    </div>
  );
};

export default FileUpload;