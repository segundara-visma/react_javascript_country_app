import { useEffect, useState } from "react";

export const useFetch = url => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.length ? setFetchedData(data) : setError(data)
      })
      // .then(setFetchedData)
      // .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { fetchedData, error, loading };
};