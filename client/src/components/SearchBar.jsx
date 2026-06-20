import { useState } from "react";

const SearchBar = ({
  keyword,
  setKeyword,
}) => {
  return (
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={keyword}
      onChange={(e) =>
        setKeyword(e.target.value)
      }
      className="w-full p-3 border rounded-lg"
    />
  );
};

export default SearchBar;