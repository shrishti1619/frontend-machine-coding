import { useState } from "react";
import SearchInput from "./components/SearchInput";
import SuggestionsList from "./components/SuggestionsList";
import { useDebounce } from "./hooks/useDebounce";
import { useSuggestions } from "./hooks/useSuggestions";
import styles from "./styles/Typeahead.module.css";

const Typeahead = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const { suggestions, loading, error } = useSuggestions(debouncedQuery);

  const handleSelect = (suggestion) => {
    setQuery(suggestion.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (value) => {
    setQuery(value);
    setIsOpen(Boolean(value.trim()));
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0,
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1,
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(suggestions[highlightedIndex]);
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Search</label>
      <SearchInput
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isOpen={isOpen}
      />
      <div aria-live="polite" className={styles.srOnly}>
        {suggestions.length > 0
          ? `${suggestions.length} suggestions available`
          : ""}
      </div>
      {isOpen && (
        <SuggestionsList
          suggestions={suggestions}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Typeahead;
