import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/display/:user',
    name: 'Display',
    component: () => import('../views/PortfolioDisplay.vue')
  },
  {
    path: '/display/preview',
    name: 'Preview',
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
    name: '404',
    component: () => import('../views/404.vue')
  },
]



const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // document.title = `${to.name} - Portfolio`
    return { x: 0, y: 0 }
  }
})

export default router
