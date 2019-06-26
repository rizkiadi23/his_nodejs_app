import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Request from './views/Request.vue'
import User from './views/User.vue'
import * as auth from './services/AuthService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/request',
      name: 'request',
      component: Request,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})