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
    path: '/build',
    name: 'Build',
    component: () => import('../views/CreatePortfolio.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthPage.vue')
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
