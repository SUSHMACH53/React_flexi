import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        BlogApp
      </Link>
      <div className={styles.links}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/blog" onClick={closeMenu}>Blog</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
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
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
