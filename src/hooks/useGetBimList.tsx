import { useState, useEffect } from 'react';
import axios from 'axios';

const useBimList = () => {
  const [bimList, setBimList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchBimList = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:3001/bim/list',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        // Lets filter co-ordinates which are not valid
        const filteredBimList = response.data.data.filter(
          (bim : any ) => {
            if( bim?.map?.latitude && bim?.map?.longitude ) {
                const isLatitudeValid = bim?.map?.latitude >= -90 && bim?.map?.latitude <= 90;
                const isLongitudeValid = bim?.map?.longitude >= 0 && bim?.map?.longitude <= 90;

                if( isLatitudeValid && isLongitudeValid ) {
                    return true;
                }
            }
            return false;
          }
        );
 
        setBimList(filteredBimList); // Assuming the data is in response.data.data
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBimList();
  }, []);

  return { bimList, loading, error };
};

export default useBimList;
