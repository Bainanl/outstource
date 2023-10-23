import { createRouter, createWebHashHistory } from 'vue-router'
import store from "../store/index.js"
import HomeView from '../views/HomeView.vue'
import ClassityView from '../views/ClassityView.vue'
import BlindBox from '../views/BlindBox.vue'
import StoreView from '../views/StoreView.vue'
import DeliveryEd from '../views/DeliveryEd.vue'
import NODelivery from '../views/NODelivery.vue'
import ShopView from '../views/ShopView.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/classity',
    children: [
      {
        path: '/classity',
        name: 'classity',
        component: ClassityView
      }, {
        path: '/blindbox',
        name: 'blindbox',
        component: BlindBox
      }, {
        path: '/store',
        name: 'store',
        component: StoreView
      }, {
        path: '/deliveryed',
        name: 'deliveryed',
        component: DeliveryEd
      },
      {
        path: '/nodelivery',
        name: 'nodelivery',
        component: NODelivery
      },
      {
        path: '/shop',
        name: 'shop',
        component: ShopView
      }
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
