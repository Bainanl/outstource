import { createRouter, createWebHashHistory } from 'vue-router'
import store from "../store/index.js"

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../pages/LayOut.vue'),
    children: [
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../pages/RolesList.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../pages/UsersList.vue')
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('../pages/System.vue')
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('../pages/Classify.vue')
      },
      {
        path: '/vipmanage',
        name: 'vipmanage',
        component: () => import('../pages/Vipmanage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (!store.state.user.password) {
//     if (to.path === '/login') {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
