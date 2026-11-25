'use client';

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
  return (
    <Modal onClose={onCancel}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.actions}>
        <button type="button" className={css.cancelBtn} onClick={onCancel}>
          {cancelButtonText}
        </button>
        <button
          type="button"
          className={css.confirmBtn}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {confirmButtonText}
        </button>
      </div>
    </Modal>
  );
}
