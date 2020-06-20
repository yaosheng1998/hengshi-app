import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let base = process.env.NODE_ENV === 'production' ? '/wx' : ''

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      console.log(to)
      let { code, state } = to.query
      let routerContent = { name: state }
      if(state === 'admin_login') {
        let { generate_code } = to.query
        routerContent.params = { code, generate_code }
      } else if(state){
        routerContent.params = { token: code }
      } else {
        routerContent.name = 'admin'
      }
      router.replace(routerContent)
    }
  },
  {
    path: '/bindjw',
    name: 'bindjw',
    component: () => import('../views/Bindjw')
  },
  {
    path: '/submsg',
    name: 'submsg',
    component: () => import('../views/Submsg')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin'),
  },
  {
    path: '/admin/login/:generate_code',
    name: 'admin_login',
    component: () => import('../views/AdminLogin')
  }
]

const router = new VueRouter({
  mode: 'history',
  base,
  routes
})

// router.beforeEach((to, from , next) => {
//
//   next()
// })

export default router
