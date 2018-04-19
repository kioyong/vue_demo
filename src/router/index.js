import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Registe from '@/components/Registe'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/registe'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/registe',
      component: Registe
    }
  ]
})
