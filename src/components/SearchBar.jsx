import React from "react";

const SearchBar = ({ searchQuery, onSearchChange, onFilterClick }) => {
  return (
    <div className="search-bar">
      <div className="search-box">
        <img src="/src/assets/search_icon.svg" alt="search" className="icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Painting title"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className="search-filter-btn" onClick={onFilterClick}>
        <img src="/src/assets/filter_icon.svg" alt="filter" className="icon" />
      </button>
    </div>
  );
};

export default SearchBar;