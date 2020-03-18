import React, { useState } from "react";
import axios from "axios";
import UploadIcon from "../assets/images/upload.png";
import TickIcon from "../assets/images/tick.png";
import FailIcon from "../assets/images/fail.png";
import RefreshIcon from "../assets/images/refresh.png";

const FileUpload = ({ updateMaze }) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);

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
      setError(err.response.data);
    }
  };

  return (
    <div
      className={`file-upload-container ${uploaded ? "uploaded" : ""}${
        error ? "error" : ""
      }`}
    >
      <div className={`status`}>
        {uploading || uploaded ? "" : "Upload your text file here"}
        <div className={`error-container ${error ? "error" : ""}`}>
          <div className='error-message'>{error}</div>
          <div
            onClick={() => window.location.reload()}
            className='error-action'
          >
            <img src={RefreshIcon} alt='' />
          </div>
        </div>
      </div>

      <div
        className={`button-container ${uploaded ? "uploaded" : ""}${
          error ? "error" : ""
        }
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
        <div
          className={`expand ${uploaded ? "uploaded" : ""} ${
            error ? "error" : ""
          }`}
        >
          {error ? (
            <img src={FailIcon} alt='' />
          ) : (
            <img src={TickIcon} alt='' />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
