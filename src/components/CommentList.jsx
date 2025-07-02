import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => (
  <div className={styles.commentList} aria-live="polite">
    {comments.map((comment, idx) => (
      <Comment key={idx}
        name={comment.name}
        date={comment.date}
        text={comment.text}
        avatar={comment.avatar}
      />
    ))}
  </div>
);

export default CommentList;
