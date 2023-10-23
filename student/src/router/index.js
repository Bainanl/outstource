import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/shouye',
    children: [
      {
        path: '/shouye',
        name: 'shouye',
        component: () => import('../views/HomePage.vue')
      },
      {
        path: '/jishi',
        name: 'jishi',
        component: () => import('../views/MaterialMarket.vue')
      },
      {
        path: '/ku',
        name: 'ku',
        component: () => import('../views/PatternLibrary.vue')
      },
      {
        path: '/dingzhi',
        name: 'dingzhi',
        component: () => import('../views/DrawingCustomization.vue')
      },
      {
        path: '/hezuo',
        name: 'hezuo',
        component: () => import('../views/CooperationPlan.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
