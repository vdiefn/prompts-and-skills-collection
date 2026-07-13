const routes = [
  // 1. 獨立的認證路由（完全不套用任何 Layout 的乾淨畫面）
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/front/RegisterView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/front/LoginView.vue'),
    meta: { requiresGuest: true },
  },

  // 2. 前台主要路由 (套用 FrontLayout)
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: { requiresAuth: true }, // 需登入
      },
      {
        path: 'my-favorite',
        name: 'MyFavorite',
        component: () => import('@/views/front/MyFavorite.vue'),
        meta: { requiresAuth: true }, // 需登入
      },
    ],
  },

  // 3. 後台路由區塊
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        name: 'AdminHome',
        component: () => import('@/views/admin/AdminHome.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'category',
        name: 'AdminCategory',
        component: () => import('@/views/admin/AdminCategory.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },

  // 4. 全域錯誤路由處理 (404 頁面，擺在最外層最下方)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default routes
