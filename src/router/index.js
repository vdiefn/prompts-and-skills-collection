import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to, from) => {
//   const isAuthenticated = false
//   const isAdmin = false

//   const isTargetAdmin = to.path.startsWith('/admin')

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     if (isTargetAdmin) return { name: 'AdminLogin' }
//     return { name: 'Login' }
//   }

//   if (to.meta.requiresAdmin && !isAdmin) {
//     return { name: 'Home' }
//   }

//   if (to.meta.requiresGuest && isAuthenticated) {
//     return { name: 'Home' }
//   }
// })

export default router
