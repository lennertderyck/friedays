import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import History from '../pages/History.vue'
import Today from '../pages/Today.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import User from '../pages/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/history/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/today',
    name: 'Today',
    component: Today
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
