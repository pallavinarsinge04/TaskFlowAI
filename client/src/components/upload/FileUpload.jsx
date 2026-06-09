import { useState } from "react";

import axios from "axios";

const FileUpload = () => {

  const [file, setFile] = useState();

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append("file", file);

    await axios.post(
      "http://localhost:5000/api/upload",
      formData
    );

    alert("Uploaded");
  };

  return (

    <div>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadFile}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3"
      >
        Upload
      </button>

    </div>

  );

};

export default FileUpload;