import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import Modal from '../Modal/Modal';
import css from './AddDiaryEntryModal.module.css';

interface AddDiaryEntryModalProps {
  onClose: () => void;
}

export default function AddDiaryEntryModal({
  onClose,
}: AddDiaryEntryModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.addTaskModal}>
        <h2 className={css.title}>Новий запис</h2>
        <AddDiaryEntryForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
