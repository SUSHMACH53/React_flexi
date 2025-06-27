import React, { useState } from 'react';
import styles from '../BlogPostDetail.module.css';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useNavigate, useParams } from 'react-router-dom';

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [comments, setComments] = useState([
    // Example initial comment (remove or keep as needed)
    // { name: 'Alice', date: new Date(), text: 'Great post!', avatar: '' },
  ]);
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

  const handleAddComment = (comment) => {
    setComments((prev) => [
      ...prev,
      {
        ...comment,
        date: new Date(),
        avatar: '', // You can add avatar logic here
      },
    ]);
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
      {/* Comment Section */}
      <h2 style={{ marginTop: 48, fontSize: 24, color: '#333' }}>Comments</h2>
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleAddComment} isLoggedIn={false} userName="" />
    </div>
  );
};

export default BlogPostDetail;