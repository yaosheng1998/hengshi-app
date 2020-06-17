import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wx/bindjw',
    name: 'Bindjw',
    component: () => import('../views/wx/Bindjw')
  },
  {
    path: '/invoke',
    name: 'Invoke',
    component: () => import('../views/Invoke')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
