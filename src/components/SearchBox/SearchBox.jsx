import React, { useState, useRef, useEffect } from "react";
import { StyledSearchBox } from "./styledComponent";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { INDIAN_CITIES } from "../../utils/Constants/IndianCities";

export const SearchBox = ({ onSearch, placeholder = "Search by name, city, or services..." }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter cities based on search query (case-insensitive)
  const getCitySuggestions = (query) => {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    const lowerQuery = query.toLowerCase().trim();
    return INDIAN_CITIES.filter(city => 
      city.toLowerCase().startsWith(lowerQuery)
    ).slice(0, 5); // Show top 5 suggestions
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Get city suggestions
    const citySuggestions = getCitySuggestions(value);
    setSuggestions(citySuggestions);
    setShowSuggestions(citySuggestions.length > 0);
    setSelectedIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (city) => {
    setSearchQuery(city);
    setShowSuggestions(false);
    setSuggestions([]);
    onSearch(city);
  };

  // Handle search button click or Enter key
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      onSearch(searchQuery.trim());
    }
  };

  // Handle clear button
  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(""); // Clear search
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledSearchBox>
      <div className="search-box-container">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
          />
          {searchQuery && (
            <button
              className="clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
          <button
            className="search-button"
            onClick={handleSearch}
            aria-label="Search"
          >
            Search
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="suggestions-dropdown">
            {suggestions.map((city, index) => (
              <div
                key={city}
                className={`suggestion-item ${index === selectedIndex ? "selected" : ""}`}
                onClick={() => handleSuggestionClick(city)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <SearchIcon className="suggestion-icon" />
                <span>{city}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledSearchBox>
  );
};

