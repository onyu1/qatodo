import { useState } from 'react';
import TodoForm from './TodoForm';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (data) => {
    await onUpdate(todo.id, data);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      await onDelete(todo.id);
    }, 300);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      LOW: '낮음',
      MEDIUM: '보통',
      HIGH: '높음',
    };
    return labels[priority] || priority;
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  if (isEditing) {
    return (
      <article
        id={`todo-item-${todo.id}`}
        className="todo-item editing fade-in"
        data-todo-id={todo.id}
        aria-label={`${todo.title} 수정 중`}
      >
        <TodoForm
          initialData={todo}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <article
      id={`todo-item-${todo.id}`}
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''} fade-in`}
      data-todo-id={todo.id}
      data-priority={todo.priority}
      data-completed={todo.completed}
      aria-label={`${todo.title}, 우선순위 ${getPriorityLabel(todo.priority)}, ${todo.completed ? '완료됨' : '진행 중'}`}
    >
      <div className="todo-checkbox">
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`${todo.title} ${todo.completed ? '완료 취소' : '완료로 표시'}`}
        />
        <label
          htmlFor={`todo-checkbox-${todo.id}`}
          className="checkbox-custom"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </label>
      </div>

      <div className="todo-content">
        <div className="todo-header">
          <h3 id={`todo-title-${todo.id}`} className="todo-title">{todo.title}</h3>
          <span
            id={`todo-priority-${todo.id}`}
            className={`priority-badge priority-${todo.priority.toLowerCase()}`}
            aria-label={`우선순위: ${getPriorityLabel(todo.priority)}`}
          >
            {getPriorityLabel(todo.priority)}
          </span>
        </div>

        {todo.description && (
          <p id={`todo-description-${todo.id}`} className="todo-description">
            {todo.description}
          </p>
        )}

        <div className="todo-meta">
          {todo.dueDate && (
            <span
              id={`todo-duedate-${todo.id}`}
              className={`due-date ${isOverdue() ? 'overdue' : ''}`}
              aria-label={`마감일: ${formatDate(todo.dueDate)}${isOverdue() ? ', 기한 초과' : ''}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatDate(todo.dueDate)}
            </span>
          )}
          <span
            id={`todo-created-${todo.id}`}
            className="created-date"
            aria-label={`생성일: ${formatDate(todo.createdAt)}`}
          >
            {formatDate(todo.createdAt)}
          </span>
        </div>
      </div>

      <div className="todo-actions" role="group" aria-label="할 일 작업">
        <button
          id={`todo-edit-btn-${todo.id}`}
          className="btn-icon btn-edit"
          onClick={() => setIsEditing(true)}
          aria-label={`${todo.title} 수정`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          id={`todo-delete-btn-${todo.id}`}
          className="btn-icon btn-delete"
          onClick={handleDelete}
          aria-label={`${todo.title} 삭제`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
