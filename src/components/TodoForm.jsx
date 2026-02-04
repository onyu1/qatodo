import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'MEDIUM',
    dueDate: initialData?.dueDate ? initialData.dueDate.slice(0, 16) : '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    } else if (formData.title.length > 200) {
      newErrors.title = '제목은 200자 이내로 입력해주세요';
    }
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = '설명은 1000자 이내로 입력해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? formData.dueDate + ':00' : null,
    };

    onSubmit(submitData);

    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: '',
      });
    }
  };

  const formId = initialData ? `todo-edit-form-${initialData.id}` : 'todo-create-form';

  return (
    <form
      id={formId}
      className="todo-form"
      onSubmit={handleSubmit}
      role="form"
      aria-label={initialData ? '할 일 수정 폼' : '새 할 일 추가 폼'}
    >
      <div className="form-group">
        <label htmlFor={`${formId}-title`}>
          제목 <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id={`${formId}-title`}
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="할 일을 입력하세요"
          className={errors.title ? 'error' : ''}
          aria-required="true"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? `${formId}-title-error` : undefined}
        />
        {errors.title && (
          <span id={`${formId}-title-error`} className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={`${formId}-description`}>설명</label>
        <textarea
          id={`${formId}-description`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="상세 설명 (선택사항)"
          rows="3"
          className={errors.description ? 'error' : ''}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? `${formId}-description-error` : undefined}
        />
        {errors.description && (
          <span id={`${formId}-description-error`} className="error-message" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${formId}-priority`}>우선순위</label>
          <select
            id={`${formId}-priority`}
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">낮음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">높음</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-dueDate`}>마감일</label>
          <input
            type="datetime-local"
            id={`${formId}-dueDate`}
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            id={`${formId}-cancel-btn`}
            className="btn-cancel"
            onClick={onCancel}
          >
            취소
          </button>
        )}
        <button
          type="submit"
          id={`${formId}-submit-btn`}
          className="btn-submit"
        >
          {initialData ? '수정하기' : '추가하기'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
