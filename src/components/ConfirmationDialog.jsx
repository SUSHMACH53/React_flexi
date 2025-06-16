import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, loading }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') {
          // Trap focus
          const focusable = dialogRef.current.querySelectorAll('button');
          if (focusable.length === 2) {
            if (document.activeElement === focusable[0] && e.shiftKey) {
              e.preventDefault();
              focusable[1].focus();
            } else if (document.activeElement === focusable[1] && !e.shiftKey) {
              e.preventDefault();
              focusable[0].focus();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={e => e.stopPropagation()}
      >
        <h2 id="dialog-title">Confirm Deletion</h2>
        <p id="dialog-description">Are you sure you want to delete this post?</p>
        <div className={styles.buttons}>
          <button onClick={onClose} disabled={loading}>Cancel</button>
          <button onClick={onConfirm} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationDialog;
