const SearchInput = ({ value, onChange, onKeyDown, isOpen }) => {
  return (
    <input
      id="typeahead-input"
      type="text"
      value={value}
      placeholder="Search..."
      aria-autocomplete="list"
      aria-expanded={isOpen}
      aria-controls="suggestions-list"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};

export default SearchInput;
