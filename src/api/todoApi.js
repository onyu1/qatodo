// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8082/api/todos';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// ============================================
// Mock Data (임시 데이터 - API 연결 전까지 사용)
// ============================================
let mockTodos = [
  {
    id: 1,
    title: '프로젝트 기획서 작성',
    description: 'QA 자동화 프로젝트 기획서 초안 작성하기',
    priority: 'HIGH',
    completed: false,
    createdAt: '2025-02-04T09:00:00',
    updatedAt: '2025-02-04T09:00:00',
  },
  {
    id: 2,
    title: '테스트 케이스 검토',
    description: '로그인 기능 테스트 케이스 리뷰',
    priority: 'MEDIUM',
    completed: true,
    createdAt: '2025-02-03T14:30:00',
    updatedAt: '2025-02-04T10:00:00',
  },
  {
    id: 3,
    title: 'Selenium 스크립트 작성',
    description: '회원가입 플로우 자동화 스크립트 개발',
    priority: 'HIGH',
    completed: false,
    createdAt: '2025-02-02T11:00:00',
    updatedAt: '2025-02-02T11:00:00',
  },
  {
    id: 4,
    title: '버그 리포트 정리',
    description: '이번 주 발견된 버그들 Jira에 등록',
    priority: 'LOW',
    completed: false,
    createdAt: '2025-02-01T16:00:00',
    updatedAt: '2025-02-01T16:00:00',
  },
  {
    id: 5,
    title: '팀 미팅 준비',
    description: '주간 QA 미팅 발표자료 준비',
    priority: 'MEDIUM',
    completed: true,
    createdAt: '2025-01-31T09:00:00',
    updatedAt: '2025-02-01T08:00:00',
  },
];

let nextId = 6;

// Mock delay to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const todoApi = {
  // Get all todos
  getAll: async () => {
    await delay(300);
    return [...mockTodos];
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.get('');
    // return response.data;
  },

  // Get todo by id
  getById: async (id) => {
    await delay(200);
    const todo = mockTodos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    return { ...todo };
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.get(`/${id}`);
    // return response.data;
  },

  // Create new todo
  create: async (todo) => {
    await delay(300);
    const newTodo = {
      id: nextId++,
      ...todo,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTodos.unshift(newTodo);
    return { ...newTodo };
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.post('', todo);
    // return response.data;
  },

  // Update todo
  update: async (id, todo) => {
    await delay(300);
    const index = mockTodos.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Todo not found');
    mockTodos[index] = {
      ...mockTodos[index],
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockTodos[index] };
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.put(`/${id}`, todo);
    // return response.data;
  },

  // Toggle complete status
  toggleComplete: async (id) => {
    await delay(200);
    const index = mockTodos.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Todo not found');
    mockTodos[index] = {
      ...mockTodos[index],
      completed: !mockTodos[index].completed,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockTodos[index] };
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.patch(`/${id}/toggle`);
    // return response.data;
  },

  // Delete todo
  delete: async (id) => {
    await delay(200);
    const index = mockTodos.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Todo not found');
    mockTodos.splice(index, 1);
    // 실제 API 연결 시 아래 코드 사용
    // await api.delete(`/${id}`);
  },

  // Filter by completed status
  filterByCompleted: async (completed) => {
    await delay(200);
    return mockTodos.filter(t => t.completed === completed);
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.get('/filter/completed', { params: { completed } });
    // return response.data;
  },

  // Filter by priority
  filterByPriority: async (priority) => {
    await delay(200);
    return mockTodos.filter(t => t.priority === priority);
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.get('/filter/priority', { params: { priority } });
    // return response.data;
  },

  // Search by title
  search: async (keyword) => {
    await delay(200);
    const lowerKeyword = keyword.toLowerCase();
    return mockTodos.filter(t =>
      t.title.toLowerCase().includes(lowerKeyword) ||
      (t.description && t.description.toLowerCase().includes(lowerKeyword))
    );
    // 실제 API 연결 시 아래 코드 사용
    // const response = await api.get('/search', { params: { keyword } });
    // return response.data;
  },
};

export default todoApi;
