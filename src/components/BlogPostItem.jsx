import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogPostItem = ({ id, title, summary, date, url }) => (
  <div className={styles.blogPostItem}>
    <Link to={url} className={styles.title}>
      <h2>{title}</h2>
    </Link>
    <p className={styles.summary}>{summary}</p>
    <p className={styles.date}>Published on {formatDate(date)}</p>
  </div>
);

export default BlogPostItem;