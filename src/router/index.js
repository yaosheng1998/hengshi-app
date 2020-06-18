import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let base = process.env.NODE_ENV === 'production' ? '/wx' : ''

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bindjw',
    name: 'bindjw',
    component: () => import('../views/Bindjw')
  },
  {
    path: '/invoke',
    name: 'submsg',
    component: () => import('../views/Invoke')
  }
]

const router = new VueRouter({
  mode: 'history',
  base,
  routes
})

export default router
