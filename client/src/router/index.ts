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
  {
    path: '/display/preview',
    name: 'PortfolioDisplayPreview',
    component: () => import('../views/PortfolioDisplay.vue')
  },
  {
    path: '/edit',
    name: 'EditPortfolio',
    component: () => import('../views/CreatePortfolio.vue')
  },
  {
    path: '*',
    name: '404Error',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
