import { BASE_API, EXT_API } from "constant";
import { useCallback } from "react";

export const useFetcher = () => {
  const getFetch = useCallback(async (endpoint: string, params?: string) => {
    return fetch(`${EXT_API}${endpoint}/${params || ""} `).then((res) =>
      res.json()
    );
  }, []);

  const postFetch = useCallback(async (endpoint, values) => {
    return fetch(`${EXT_API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  }, []);

  const putFetch = useCallback(async (endpoint, values) => {
    return fetch(`${EXT_API}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  }, []);

  const deleteFetch = useCallback(async (endpoint, values) => {
    return fetch(`${EXT_API}${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  }, []);

  return { getFetch, postFetch, putFetch, deleteFetch };
};
