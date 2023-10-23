import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import HomePage from '@/views/HomePage.vue'
import VenueList from '@/views/VenueList.vue'
import VipCard from '@/views/VipCard.vue'
import Coupon from '@/views/Coupon.vue'
import Thali from '@/views/Thali.vue'
import Marketing from '@/views/Marketing.vue'
import AppCenter from '@/views/AppCenter/index.vue'
// 统计分析
import Trade from '@/views/Trade.vue'
import VipAnlysic from '@/views/VipAnlysic.vue'
import ThaliAnlysic from '@/views/ThaliAnlysic.vue'
import FeeAnlysic from '@/views/FeeAnlysic.vue'
import SpuAnlysic from '@/views/SpuAnlysic.vue'
import CouAnlysic from '@/views/CouAnlysic.vue'
import ActAnlysic from '@/views/ActAnlysic.vue'
import BooAnlysic from '@/views/BooAnlysic.vue'
import PeoAnlysic from '@/views/PeoAnlysic.vue'
import StaffNotice from '@/views/StaffNotice.vue'
import VipNotice from '@/views/VipNotice.vue'
import FeedBack from '@/views/FeedBack.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/venuelist',
      name: 'venuelist',
      component: VenueList
    },
    {
      path: '/vipcard',
      name: 'vipcard',
      component: VipCard
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon
    },
    {
      path: '/thali',
      name: 'thali',
      component: Thali
    },
    {
      path: '/marketing',
      name: 'marketing',
      component: Marketing
    },
    {
      path: '/appcenter',
      name: 'appcenter',
      component: AppCenter
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
    },
    {
      path: '/vipanlysic',
      name: 'vipanlysic',
      component: VipAnlysic,
    },
    {
      path: '/thalianlysic',
      name: 'thalianlysic',
      component: ThaliAnlysic
    },
    {
      path: '/feeanlysic',
      name: 'feeanlysic',
      component: FeeAnlysic
    },
    {
      path: '/spuanlysic',
      name: 'spuanlysic',
      component: SpuAnlysic
    },
    {
      path: '/couanlysic',
      name: 'couanlysic',
      component: CouAnlysic
    },
    {
      path: '/actanlysic',
      name: 'actanlysic',
      component: ActAnlysic
    },
    {
      path: '/booanlysic',
      name: 'booanlysic',
      component: BooAnlysic
    },
    {
      path: '/peoanlysic',
      name: 'peoanlysic',
      component: PeoAnlysic
    },
    {
      path: '/staffnotice',
      name: 'staffnotice',
      component: StaffNotice
    },
    {
      path: '/vipnotice',
      name: 'vipnotice',
      component: VipNotice
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBack
    }
  ]
})

export default router
