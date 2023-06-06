export function SearchBar({ name, input, onInputChange }) {
  return (
    <input
      placeholder={`Search ${name}`}
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      className="search-bar"
    />
  );
}