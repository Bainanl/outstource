import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import AllTeacher from '@/views/AllTeacher/index.vue'
import Details from '@/views/Details/index.vue'
import AllClass from '@/views/AllClass/index.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'allteacher',
          component: AllTeacher
        },
        {
          path: '/details/:id',
          name: 'details',
          component: Details
        },
        {
          path: '/allclass',
          name: 'allclass',
          component: AllClass
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const stores = useCounterStore()
  // 在这里编写你的路由守卫逻辑
  // 检查用户是否有权限访问该路由，或者执行其他验证操作
  if (stores.userInfo.token) {
    next();
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  // 如果用户有权限访问该路由，调用 `next()` 方法

  // 如果用户没有权限访问该路由，可以调用 `next(false)` 取消导航
  // 或者调用 `next('/login')` 重定向到其他页面
});

export default router
