'use client';

import { useCallback } from 'react';
import clsx from 'clsx';
import Modal from '@/components/Modal/Modal';
import css from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  const handleClose = useCallback(() => {
    if (!isLoading) onCancel();
  }, [isLoading, onCancel]);

  return (
    <Modal onClose={handleClose}>
      <div className={css.confirmationModal}>
        <h2 className={css.title}>{title}</h2>

        <div className={css.actions}>
          <button
            type="button"
            className={clsx(css.button, css.cancelButton)}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={clsx(css.button, css.confirmButton)}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
