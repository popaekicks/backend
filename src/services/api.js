const API_URL = '/api'

async function request(endpoint, options = {}) {
  const { token, ...customOptions } = options
  const headers = {
    'Content-Type': 'application/json',
    ...customOptions.headers,
  }

  if (token) {
    headers['Authorization'] = token
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...customOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || 'Something went wrong')
  }

  return response.json()
}

export const authService = {
  login: (username, password) => 
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
  register: (username, password) => 
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
}

export const taskService = {
  getAll: (token) => 
    request('/tasks', { token }),
  
  create: (token, title) => 
    request('/tasks', {
      method: 'POST',
      token,
      body: JSON.stringify({ title })
    }),

  update: (token, id, updates) => 
    request(`/tasks/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(updates)
    }),

  delete: (token, id) => 
    request(`/tasks/${id}`, {
      method: 'DELETE',
      token,
    })
}
