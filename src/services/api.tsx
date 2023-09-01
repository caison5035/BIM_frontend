import jwtInterceptor from "../shared/jwtInterceptor";
import { BIMListResponse } from "../models/api";
import { MarkerItem } from "../models/Marker";

export const getBimList = async (searchQuery = "") => {
  try {
    const response: BIMListResponse = await jwtInterceptor.get(
      `http://127.0.0.1:3001/bim/search?search=${searchQuery}`
    );
    // Lets filter co-ordinates which are not valid
    const filteredBimList = response.data.data.filter((bim: any) => {
      if (bim?.map?.latitude && bim?.map?.longitude) {
        const isLatitudeValid =
          bim?.map?.latitude >= -90 && bim?.map?.latitude <= 90;
        const isLongitudeValid =
          bim?.map?.longitude >= -180 && bim?.map?.longitude <= 180;

        if (isLatitudeValid && isLongitudeValid) {
          return true;
        }
      }
      return false;
    });

    return filteredBimList;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const handleUpload = async (selectedFile: any, marker: MarkerItem) => {
  console.log("File upload", marker, selectedFile);

  if (!selectedFile) {
    alert("Please select a file first."); // Display alert if no file is selected
  } else if (!marker) {
    alert("Please select location to tag with bim file."); // Display alert if no file is selected
  } else {
    // Logic for handling selected location
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append("longitude", marker.longitude.toString());
    formData.append("latitude", marker.latitude.toString());

    try {
      const response = await jwtInterceptor.post(
        `http://127.0.0.1:3001/bim/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Marker added:", response.data); // Handle response data
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return null;
  }
};
