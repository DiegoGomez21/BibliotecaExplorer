import Vue from 'vue'
import Router from 'vue-router'

import ListBook from '@/components/Book/ListBook'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

Vue.use(Router)

const guard = function (to, from, next) {
  if (localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        guard(to, from, next)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/books',
      name: 'ListBook',
      component: ListBook
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
  mode: 'history'
})
