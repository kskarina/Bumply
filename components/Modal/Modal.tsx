'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/Icon/Icon';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

// Базова модалка: закривається по бекдропу, Escape і кнопці-хрестику.
// Від неї робимо AddTaskModal, AddDiaryEntryModal і ConfirmationModal.
export default function Modal({ onClose, children }: ModalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById('modal-root'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!root) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.modal} role="dialog" aria-modal="true">
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Закрити"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    root
  );
}
