'use client';

import Modal from '@/components/Modal/Modal';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import css from './AddTaskModal.module.css';

interface AddTaskModalProps {
  onClose: () => void;
}

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.addTaskModal}>
        <h2 className={css.title}>Нове завдання</h2>
        <AddTaskForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
