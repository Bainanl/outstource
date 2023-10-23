import { createRouter, createWebHashHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter.js'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import OilCard from '@/views/OilCard/index.vue'
import OilcardDetails from '@/views/OilcardDetails/index.vue'
import UserList from '@/views/UserList/index.vue'
import UserDetails from '@/views/UserDetails/index.vue'
import OrderList from '@/views/OrderList/index.vue'
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
          name: 'oilcard',
          component: OilCard
        },
        {
          path: '/oilcarddetails/:id',
          name: 'oilcarddetails',
          component: OilcardDetails
        },
        {
          path: '/userlists',
          name: 'userlists',
          component: UserList
        },
        {
          path: '/userdetails/:id',
          name: 'userdetails',
          component: UserDetails
        },
        {
          path: '/orderlist',
          name: 'userlist',
          component: OrderList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
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
