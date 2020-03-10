import React, { useState } from "react";
import axios from "axios";
import UploadIcon from "../assets/images/upload.png";
import TickIcon from "../assets/images/tick.png";

const FileUpload = ({ updateMaze }) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onChange = async e => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setUploading(true);

    try {
      const res = await axios.post("/api/upload", formData);
      updateMaze(res.data);
      setTimeout(() => {
        setUploaded(true);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`file-upload-container ${uploaded ? "uploaded" : ""}`}>
      <div className={`status`}>
        {uploading || uploaded ? "" : "Upload your text file here"}
      </div>

      <div
        className={`button-container ${uploaded ? "uploaded" : ""}
        `}
      >
        <input type='file' id='choose-file' onChange={onChange} />
        <label
          className={`choose-file-label ${uploading ? "uploading" : ""}`}
          htmlFor='choose-file'
        >
          <img src={UploadIcon} alt='' />
        </label>
        <div className='wipe'></div>
        <div className={`expand ${uploaded ? "uploaded" : ""}`}>
          <img src={TickIcon} alt='' />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
