import React, { useState } from 'react';
import axios from 'axios';

function UploadBIMObject({handleUpload}:any) {
  const [selectedFile, setSelectedFile] = useState({});

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  return(
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={()=>handleUpload(selectedFile)}>Upload</button>
    </div>
  );
}

export default UploadBIMObject;
