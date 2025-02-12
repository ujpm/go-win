const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  courses: {
    list: `${API_BASE_URL}/courses`,
    details: (id: string) => `${API_BASE_URL}/courses/${id}`,
    create: `${API_BASE_URL}/courses`,
    update: (id: string) => `${API_BASE_URL}/courses/${id}`,
    delete: (id: string) => `${API_BASE_URL}/courses/${id}`,
  },
  resources: {
    list: `${API_BASE_URL}/resources`,
    details: (id: string) => `${API_BASE_URL}/resources/${id}`,
    create: `${API_BASE_URL}/resources`,
    update: (id: string) => `${API_BASE_URL}/resources/${id}`,
    delete: (id: string) => `${API_BASE_URL}/resources/${id}`,
  },
  practice: {
    list: `${API_BASE_URL}/practice`,
    start: `${API_BASE_URL}/practice/start`,
    submit: `${API_BASE_URL}/practice/submit`,
  },
};
