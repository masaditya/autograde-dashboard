import { BASE_API, EXT_API } from "constant";
import { useCallback } from "react";

export const useFetcher = () => {
  const getFetch = useCallback(async (endpoint: string, params?: string) => {
    return fetch(`${EXT_API}${endpoint}/${params || ""} `).then((res) =>
      res.json()
    );
  }, []);

  const postFetch = useCallback(async (endpoint, values) => {
    const response = await fetch(EXT_API + endpoint, {
      method: "POST",
      body: JSON.stringify(values),
    });
    let data = await response.json();
    return data;
  }, []);

  return { getFetch, postFetch };
};
