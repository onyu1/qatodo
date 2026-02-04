import './FilterBar.css';

function FilterBar({ filter, onFilterChange, searchKeyword, onSearchChange }) {
  return (
    <div id="filter-bar" className="filter-bar" role="search" aria-label="할 일 검색 및 필터">
      <div className="search-box">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="search-input"
          type="text"
          placeholder="검색..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="할 일 검색"
        />
        {searchKeyword && (
          <button
            id="search-clear-btn"
            className="clear-search"
            onClick={() => onSearchChange('')}
            aria-label="검색어 지우기"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div id="filter-buttons" className="filter-buttons" role="group" aria-label="필터 버튼">
        <button
          id="filter-btn-all"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
          aria-pressed={filter === 'all'}
        >
          전체
        </button>
        <button
          id="filter-btn-pending"
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => onFilterChange('pending')}
          aria-pressed={filter === 'pending'}
        >
          진행 중
        </button>
        <button
          id="filter-btn-completed"
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
          aria-pressed={filter === 'completed'}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
