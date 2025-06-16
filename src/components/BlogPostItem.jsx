import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import styles from './BlogPostItem.module.css';

function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogPostItem = ({ id, title, summary, date, url, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(id);
    setDeleting(false);
    setShowDialog(false);
  };

  return (
    <div className={styles.blogPostItem}>
      <Link to={url} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {formatDate(date)}</p>
      <div className={styles.actions}>
        <Link to={`/edit/${id}`} className={styles.editButton}>Edit</Link>
        <DeleteButton onClick={() => setShowDialog(true)} disabled={deleting} />
      </div>
      <ConfirmationDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};

export default BlogPostItem;