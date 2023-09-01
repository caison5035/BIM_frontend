import React, { useState } from "react";

function UploadBIMObject({ handleUpload, handleClose, selectedMarker }: any) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
    } else {
      return handleUpload(selectedFile, selectedMarker);
    }
  };

  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="p-6">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Add BIM objects / markers to map
          </p>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <b>Latitude:</b>
              <>
                {selectedMarker?.latitude}
              </>
            </p>
            <p>
              <b>Longitude:</b>
              <>
                {selectedMarker?.longitude}
              </>
            </p>
          </div>
          <ul className="my-4 space-y-3">
            <li>
              <button
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                onClick={() => document?.getElementById('upload-file')?.click()}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Upload file
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                  +
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto save-btn"
          onClick={() => handleSubmit()}
        >
          Save marker
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => handleClose()}
        >
          Cancel
        </button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} id="upload-file" hidden />
      </div>
    </div>
  );
}

export default UploadBIMObject;
