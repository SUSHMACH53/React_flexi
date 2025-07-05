import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ searchBar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftGroup}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          BlogApp
        </Link>
      </div>
      <div className={styles.centerGroup}>
        {searchBar && <div className={styles.searchBarNav}>{searchBar}</div>}
      </div>
      <div className={styles.rightGroup}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/create" onClick={closeMenu}>New Post</Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/create" onClick={closeMenu}>New Post</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
