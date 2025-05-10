import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.penmaster.pro/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Thêm token vào mọi request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// (Tùy chọn) Xử lý lỗi token hết hạn
api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    // Token hết hạn hoặc không hợp lệ => xóa token và reload/truyền sự kiện global
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default api
