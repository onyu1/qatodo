import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onUpdate, onDelete, loading }) {
  if (loading) {
    return (
      <div id="todo-list-loading" className="todo-list-loading" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div id="todo-list-empty" className="todo-list-empty" role="status" aria-live="polite">
        <div className="empty-icon" aria-hidden="true">📝</div>
        <h3>할 일이 없습니다</h3>
        <p>새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <section
      id="todo-list"
      className="todo-list"
      role="list"
      aria-label={`할 일 목록, 총 ${todos.length}개`}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TodoList;
