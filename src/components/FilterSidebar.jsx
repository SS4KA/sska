import React, { useState, useEffect } from "react";

const FilterSidebar = ({ isOpen, onClose, filters, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    artist: "",
    location: "",
    yearFrom: "",
    yearTo: "",
  });
  const [openGroups, setOpenGroups] = useState({
    artist: false,
    location: false,
    years: false,
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const emptyFilters = { artist: "", location: "", yearFrom: "", yearTo: "" };
    setLocalFilters(emptyFilters);
    onClearFilters();
    onClose();
  };

  return (
    <div className={`filter-sidebar ${isOpen ? "active" : ""}`} id="filterMenu">
      <div className="filter-sidebar-container">
        <button className="close-sidebar-btn" onClick={onClose}>
          <img src="./src/assets/close_icon.svg" alt="close" className="icon" />
        </button>
        <div className="filter-sidebar-content">
          <ul className="filter-group-list">
            {/* Artist Filter */}
            <li className="filter-group">
              <div className="filter-group-header" onClick={() => toggleGroup("artist")}>
                <h1>Artist</h1>
                <div className={`filter-group-toggle ${openGroups.artist ? "active" : ""}`}>
                  <span></span>
                </div>
              </div>
              <div className={`filter-group-body ${!openGroups.artist ? "hidden" : ""}`}>
                <input
                  type="text"
                  placeholder="Select the artist"
                  value={localFilters.artist}
                  onChange={(e) => handleInputChange("artist", e.target.value)}
                />
              </div>
            </li>

            {/* Location Filter */}
            <li className="filter-group">
              <div className="filter-group-header" onClick={() => toggleGroup("location")}>
                <h1>Location</h1>
                <div className={`filter-group-toggle ${openGroups.location ? "active" : ""}`}>
                  <span></span>
                </div>
              </div>
              <div className={`filter-group-body ${!openGroups.location ? "hidden" : ""}`}>
                <input
                  type="text"
                  placeholder="Select the location"
                  value={localFilters.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </li>

            {/* Years Filter */}
            <li className="filter-group">
              <div className="filter-group-header" onClick={() => toggleGroup("years")}>
                <h1>Years</h1>
                <div className={`filter-group-toggle ${openGroups.years ? "active" : ""}`}>
                  <span></span>
                </div>
              </div>
              <div className={`filter-group-body ${!openGroups.years ? "hidden" : ""}`}>
                <input
                  className="filter-year-input"
                  type="text"
                  placeholder="From"
                  value={localFilters.yearFrom}
                  onChange={(e) => handleInputChange("yearFrom", e.target.value)}
                />
                <span className="filter-year-sep"></span>
                <input
                  className="filter-year-input"
                  type="text"
                  placeholder="To"
                  value={localFilters.yearTo}
                  onChange={(e) => handleInputChange("yearTo", e.target.value)}
                />
              </div>
            </li>
          </ul>
          <div className="filter-actions">
            <button className="filter-action-btn action-apply" onClick={handleApply}>
              Show the results
            </button>
            <button className="filter-action-btn action-clear" onClick={handleClear}>
              clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
