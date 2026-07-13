const routes = [
  // 前台路由 (需要登入)
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: { requiresAuth: false }, // 公開首頁
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: { requiresGuest: true }, // 已登入者不需重複進登入頁
      },

      {
        path: 'skills',
        name: 'Skills',
        component: () => import('@/views/front/SkillsView.vue'),
        meta: { requiresAuth: true }, // 需登入
      },
      {
        path: 'my-favorite',
        name: 'MyFavorite',
        component: () => import('@/views/front/MyFavoriteView.vue'),
        meta: { requiresAuth: true }, // 需登入
      },
      // 錯誤路由處理 (404 頁面)
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
    ],
  },
  // 後台路由
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { requiresAuth: false }, // 後台登入頁本身不需預先登入
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
        meta: { requiresAuth: true, requiresAdmin: true }, // 需登入且為管理員
      },
      {
        path: 'category',
        name: 'AdminCategory',
        component: () => import('@/views/admin/AdminCategory.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }, // 需登入且為管理員
      },
    ],
  },
]

export default routes
