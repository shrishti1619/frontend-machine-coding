import { useEffect, useRef, useState } from "react";
import { fetchSuggestions } from "../services/suggestionApi";

export const useSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cacheRef = useRef({});

  useEffect(() => {
    const trimmedQuery = query.trim();
    const controller = new AbortController();
    async function getSuggestions() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchSuggestions(trimmedQuery, controller.signal);
        cacheRef.current[trimmedQuery] = data;
        setSuggestions(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong");
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }
    getSuggestions();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { suggestions, loading, error };
};
