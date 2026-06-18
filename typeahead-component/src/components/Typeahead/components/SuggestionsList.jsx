import SuggestionItem from "./SuggestionItem";
import styles from "../styles/Typeahead.module.css";

const SuggestionsList = ({
  suggestions,
  highlightedIndex,
  onSelect,
  loading,
  error,
}) => {
  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.status}>{error}</div>;
  }
  if (suggestions.length === 0) {
    return <div className={styles.status}>No suggestions found</div>;
  }
  return (
    <ul className={styles.list}>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          isHighlighted={highlightedIndex === index}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default SuggestionsList;
