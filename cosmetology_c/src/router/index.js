import { createRouter, createWebHashHistory } from 'vue-router'
import Color from '../pages/Color.vue'
import Index from '../pages/Index.vue'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/color',
    children: [
      {
        path: '/color',
        name: 'color',
        component: Color
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
