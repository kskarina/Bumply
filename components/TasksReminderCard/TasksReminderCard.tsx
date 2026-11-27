'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import Icon from '@/components/Icon/Icon';
import Loader from '@/components/Loader/Loader';
import { fetchTasks, updateTaskStatus } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import css from './TasksReminderCard.module.css';

const TASKS_PER_PAGE = 10;

const formatDate = (date: string) => `${date.slice(8, 10)}.${date.slice(5, 7)}`;

export default function TasksReminderCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const isAuthChecked = useAuthStore(s => s.isAuthChecked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam }) =>
      fetchTasks({ sortOrder: 'asc', page: pageParam, limit: TASKS_PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: isAuthenticated,
  });

  const { mutate: toggleTask } = useMutation({
    mutationFn: ({ taskId, isDone }: { taskId: string; isDone: boolean }) =>
      updateTaskStatus(taskId, isDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    onError: err => toast.error(getErrorMessage(err)),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { id: 'tasks' });
    }
  }, [isError, error]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddClick = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  const tasks = data?.pages.flatMap(page => page.tasks) ?? [];

  return (
    <section className={css.tasksReminderCard}>
      <div className={css.header}>
        <h2 className={css.title}>Важливі завдання</h2>
        <button
          type="button"
          className={css.addButton}
          onClick={handleAddClick}
          aria-label="Додати завдання"
        >
          <Icon name="add-circle" size={24} />
        </button>
      </div>

      {(!isAuthChecked || isLoading) && <Loader />}

      {isAuthChecked && !isLoading && tasks.length === 0 && (
        <div className={css.empty}>
          <div className={css.emptyText}>
            <p className={css.emptyTitle}>Наразі немає жодних завдань</p>
            <p className={css.emptyHint}>Створіть мерщій нове завдання!</p>
          </div>
          <button type="button" className={css.button} onClick={handleAddClick}>
            Створити завдання
          </button>
        </div>
      )}

      {tasks.length > 0 && (
        <ul className={css.list}>
          {tasks.map(task => (
            <li key={task._id} className={css.item}>
              <p className={css.date}>{formatDate(task.date)}</p>
              <label className={css.row}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={task.isDone}
                  onChange={() =>
                    toggleTask({ taskId: task._id, isDone: !task.isDone })
                  }
                />
                <span className={css.name}>{task.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      {hasNextPage && (
        <div ref={loadMoreRef} className={css.loadMore}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
