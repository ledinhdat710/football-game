import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './LoginPage.vue'
import HomePage from './HomePage.vue'
import GameSoccerStrike from './game/soccerStrike.vue'

// 👉 Import axios nếu muốn xài global (tùy chọn)
// import api from './utils/axios'

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
router.beforeEach((to, _from, next) => {
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

library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app')
