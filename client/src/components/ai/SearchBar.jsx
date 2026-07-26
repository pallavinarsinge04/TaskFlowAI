import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaHistory,
} from "react-icons/fa";

function SearchBar({
  value = "",
  onChange,
}) {
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    onChange(text);
  };

  const clearSearch = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const saveSearch = () => {
    if (!value.trim()) return;

    if (recentSearches.includes(value)) return;

    setRecentSearches((prev) => [
      value,
      ...prev,
    ].slice(0, 5));
  };

  return (
    <div className="search-wrapper">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          ref={inputRef}
          value={value}
          onChange={handleSearch}
          onBlur={saveSearch}
          placeholder="Search conversations..."
        />

        {value && (
          <button
            className="clear-btn"
            onClick={clearSearch}
          >
            <FaTimes />
          </button>
        )}

      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches">

          <div className="recent-title">
            <FaHistory />
            Recent Searches
          </div>

          {recentSearches.map((item, index) => (
            <button
              key={index}
              className="recent-item"
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default SearchBar;