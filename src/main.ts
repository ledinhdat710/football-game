import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './LoginPage.vue'
import HomePage from './HomePage.vue'
import GameSoccerStrike from './game/soccerStrike.vue'

// 👉 Import axios nếu muốn xài global (tùy chọn)
import api from './utils/axios'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/soccer-strike', component: GameSoccerStrike },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 👉 Thêm guard ở đây
router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (authRequired && !token) {
    return next('/login')
  }

  if (to.path === '/login' && token) {
    return next('/home')
  }

  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
