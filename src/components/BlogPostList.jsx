import React from 'react';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts, onDelete, searchQuery }) => {
  if (!posts || posts.length === 0) {
    return <div className={styles.empty}>No posts found.</div>;
  }

  // Optional: highlight search terms in title/summary
  const highlight = (text) => {
    if (!searchQuery) return text;
    const q = searchQuery.trim();
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div className={styles.blogPostList}>
      {posts.map(post => (
        <BlogPostItem
          key={post.id}
          id={post.id}
          title={highlight(post.title)}
          summary={highlight(post.summary)}
          date={post.date}
          url={post.url}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogPostList;