import { DiaryNote } from '@/types/diary';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import Modal from '../Modal/Modal';
import css from './AddDiaryEntryModal.module.css';

interface AddDiaryEntryModalProps {
  onClose: () => void;
  editEntry?: DiaryNote;
}

export default function AddDiaryEntryModal({
  onClose,
  editEntry,
}: AddDiaryEntryModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.addDiaryEntryModal}>
        <h2 className={css.title}>
          {editEntry ? 'Редагувати запис' : 'Новий запис'}
        </h2>
        <AddDiaryEntryForm editEntry={editEntry} onSuccess={onClose} />
      </div>
    </Modal>
  );
}
