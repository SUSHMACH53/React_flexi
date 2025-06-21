import React, { useState } from 'react';
import styles from '../BlogPostDetail.module.css';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate, useParams } from 'react-router-dom';

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  if (!title || !content || !author || !date) {
    return <p className="not-found">Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete?.(id);
    setDeleting(false);
    setShowDialog(false);
    navigate('/');
  };

  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
        }}
      />
      <DeleteButton onClick={() => setShowDialog(true)} disabled={deleting} />
      <ConfirmationDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};

export default BlogPostDetail;