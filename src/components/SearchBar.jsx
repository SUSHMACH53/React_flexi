import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ query, setQuery, onSearch, isMobile, expanded, setExpanded, resultsCount }) {
  const inputRef = useRef(null);

  // Focus input when expanding on mobile
  useEffect(() => {
    if (expanded && isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, isMobile]);

  // Handle input changes (dynamic search)
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  // Handle submit (Enter or button)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  // Keyboard accessibility for mobile icon
  const handleIconKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setExpanded(true);
    }
  };

  // ARIA live region for announcing results
  const ariaLive = resultsCount !== undefined ? (
    <div className={styles.srOnly} aria-live="polite">
      {resultsCount === 0 ? 'No posts found.' : `${resultsCount} post${resultsCount > 1 ? 's' : ''} found.`}
    </div>
  ) : null;

  // Desktop view
  if (!isMobile) {
    return (
      <form className={styles.searchBar} role="search" aria-label="Search posts" onSubmit={handleSubmit}>
        <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
        <input
          id="search-input"
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={handleChange}
          aria-label="Search posts"
        />
        <button type="submit" className={styles.button} aria-label="Search">
          <span className={styles.icon} aria-hidden="true">🔍</span>
        </button>
        {ariaLive}
      </form>
    );
  }

  // Mobile view
  return (
    <div className={styles.mobileSearchWrapper}>
      {!expanded ? (
        <button
          className={styles.iconButton}
          aria-label="Open search"
          onClick={() => setExpanded(true)}
          onKeyDown={handleIconKeyDown}
        >
          <span className={styles.icon} aria-hidden="true">🔍</span>
        </button>
      ) : (
        <form className={styles.mobileSearchBar} role="search" aria-label="Search posts" onSubmit={handleSubmit}>
          <label htmlFor="mobile-search-input" className={styles.srOnly}>Search posts</label>
          <input
            id="mobile-search-input"
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={handleChange}
            aria-label="Search posts"
          />
          <button type="submit" className={styles.button} aria-label="Search">
            <span className={styles.icon} aria-hidden="true">🔍</span>
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => { setExpanded(false); setQuery(''); onSearch(''); }}
            aria-label="Cancel search"
          >
            Cancel
          </button>
          {ariaLive}
        </form>
      )}
    </div>
  );
}

export default SearchBar;
