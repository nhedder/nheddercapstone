import { useState, useEffect } from "react";

// hooks are usually named exports rather than default
export function useData(url, defaultData = {}) {
  // state variable for holding fetched json data
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json.data);
          }
        });

      // cleanup function, in case url changes before complete
      return () => {
        ignore = true;
      };
    }
  }, [url]); // re-run effect if url changes

  // return the data fetched from the given url
  return data;
}
// save as useData.jsx in the 'hooks' folder
