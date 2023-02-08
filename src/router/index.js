import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/payments',
    name: 'payments',
    component: function () {
      return import('../views/PaymentsView.vue')
    }
  },
  {
    path: '/payments/create',
    name: 'payments-create',
    component: function () {
      return import('../views/PaymentsCreateView.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
