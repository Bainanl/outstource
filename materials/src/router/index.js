import Vue from 'vue'
import VueRouter from 'vue-router'

import ShouYe from '../pages/ShouYe.vue'
import Materialmarket from '../pages/Materialmarket.vue'
import Patternlibrary from '../pages/Patternlibrary.vue'
import Drawingcustomization from '../pages/Drawingcustomization.vue'
import Cooperationplan from '../pages/Cooperationplan.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/ShouYe',
    name: 'ShouYe',
    component: ShouYe
  },
  {
    path: '/Materialmarket',
    name: 'MaterialMarket',
    component: Materialmarket
  },
  {
    path: '/Patternlibrary',
    name: 'PatternLibrary',
    component: Patternlibrary
  },
  {
    path: '/Drawingcustomization',
    name: 'DrawingCustomization',
    component: Drawingcustomization
  },
  {
    path: '/Cooperationplan',
    name: 'CooperationPlan',
    component: () => import('../pages/Cooperationplan.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
