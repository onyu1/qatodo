import './Stats.css';

function Stats({ todos, filter, onFilterChange }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const highPriority = todos.filter(t => t.priority === 'HIGH' && !t.completed).length;

  return (
    <section id="stats-section" className="stats" role="region" aria-label="할 일 통계">
      <div
        id="stat-total"
        className={`stat-card clickable ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
        role="button"
        tabIndex={0}
        aria-label={`전체 할 일 ${total}개, 클릭하여 전체 보기`}
        aria-pressed={filter === 'all'}
        onKeyDown={(e) => e.key === 'Enter' && onFilterChange('all')}
      >
        <div className="stat-icon total" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
        </div>
        <div className="stat-info">
          <span id="stat-total-value" className="stat-value">{total}</span>
          <span className="stat-label">전체</span>
        </div>
      </div>

      <div
        id="stat-pending"
        className={`stat-card clickable ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
        role="button"
        tabIndex={0}
        aria-label={`진행 중인 할 일 ${pending}개, 클릭하여 진행 중 보기`}
        aria-pressed={filter === 'pending'}
        onKeyDown={(e) => e.key === 'Enter' && onFilterChange('pending')}
      >
        <div className="stat-icon pending" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="stat-info">
          <span id="stat-pending-value" className="stat-value">{pending}</span>
          <span className="stat-label">진행 중</span>
        </div>
      </div>

      <div
        id="stat-completed"
        className={`stat-card clickable ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
        role="button"
        tabIndex={0}
        aria-label={`완료된 할 일 ${completed}개, 클릭하여 완료 보기`}
        aria-pressed={filter === 'completed'}
        onKeyDown={(e) => e.key === 'Enter' && onFilterChange('completed')}
      >
        <div className="stat-icon completed" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="stat-info">
          <span id="stat-completed-value" className="stat-value">{completed}</span>
          <span className="stat-label">완료</span>
        </div>
      </div>

      <div
        id="stat-rate"
        className="stat-card"
        role="status"
        aria-label={`완료율 ${completionRate}퍼센트`}
      >
        <div className="stat-icon rate" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <div className="stat-info">
          <span id="stat-rate-value" className="stat-value">{completionRate}%</span>
          <span className="stat-label">완료율</span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {highPriority > 0 && (
        <div
          id="stat-urgent"
          className={`stat-card urgent clickable ${filter === 'high' ? 'active' : ''}`}
          onClick={() => onFilterChange('high')}
          role="button"
          tabIndex={0}
          aria-label={`긴급 할 일 ${highPriority}개, 클릭하여 긴급 보기`}
          aria-pressed={filter === 'high'}
          onKeyDown={(e) => e.key === 'Enter' && onFilterChange('high')}
        >
          <div className="stat-icon high" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="stat-info">
            <span id="stat-urgent-value" className="stat-value">{highPriority}</span>
            <span className="stat-label">긴급</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default Stats;
