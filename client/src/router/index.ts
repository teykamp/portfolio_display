import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'CreatePortfo',
    component: () => import('../views/CreatePortfolio.vue')
  },
  {
    path: '/display/:user',
    name: 'PortfolioDisplay',
    component: () => import('../views/PortfolioDisplay.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
