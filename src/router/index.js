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
    component: () => import('../views/admin/Admin'),
    children: [
      {
        path: '/admin/edu_user',
        name: 'edu_user',
        component: () => import('../views/admin/EduUser')
      },
      {
        path: '/admin/wx_user',
        name: 'wx_user',
        component: () => import('../views/admin/WxUser')
      },
      {
        path: '/admin/curriculum',
        name: 'curriculum',
        component: () => import('../views/admin/Curriculum')
      },
      {
        path: '/admin/bill',
        name: 'bill',
        component: () => import('../views/admin/Bill')
      },
      {
        path: '/admin/config',
        name: 'config',
        component: () => import('../views/admin/Config')
      }
    ]
  },
  {
    path: '/admin/login/:generate_code',
    name: 'admin_login',
    component: () => import('../views/admin/AdminLogin')
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
