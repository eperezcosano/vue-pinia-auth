import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView,
      alias: '/login',
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    return next('')
  }
  const authRequired = to.matched.some(record => record.meta['requiresAuth'])
  if (!authRequired) {
    return next()
  }
  const authStore = useAuthStore()
  if (!authStore.isLogged) {
    return next('/')
  }
  return authStore.validate()
      .then(() => { return next() })
      .catch(() => { return next('/')})
})

export default router
