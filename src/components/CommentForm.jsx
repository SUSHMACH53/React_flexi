import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!isLoggedIn && !name.trim()) newErrors.name = 'Name is required';
    if (!text.trim()) newErrors.text = 'Comment is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    await onSubmit({ name: isLoggedIn ? userName : name, text });
    setText('');
    setSubmitting(false);
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit} aria-label="Add a comment">
      {!isLoggedIn && (
        <div className={styles.formGroup}>
          <label htmlFor="comment-name" className={styles.label}>Name</label>
          <input
            id="comment-name"
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={submitting}
            autoComplete="off"
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="comment-text" className={styles.label}>Comment</label>
        <textarea
          id="comment-text"
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={submitting}
        />
        {errors.text && <span className={styles.error}>{errors.text}</span>}
      </div>
      <div className={styles.buttonRow}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
