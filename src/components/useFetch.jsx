import { useEffect, useState } from "react";

export const useFetch = url => {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.length ? setCountries(data) : setError(data)
      })
      // .then(setCountries)
      // .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { countries, error, loading };
};