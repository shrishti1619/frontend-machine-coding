import styles from "../styles/Typeahead.module.css";

const SuggestionItem = ({ suggestion, isHighlighted, onSelect }) => {
  return (
    <li
      id={`suggestion-${suggestion.id}`}
      role="option"
      aria-selected={isHighlighted}
      className={`${styles.item} ${isHighlighted ? styles.highlighted : ""} `}
      onMouseDown={() => onSelect(suggestion)}
    >
      {suggestion.label}
    </li>
  );
};

export default SuggestionItem;
