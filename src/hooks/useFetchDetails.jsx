import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchDetails = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading };
};
