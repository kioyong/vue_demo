import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Register from '@/components/Register'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/', redirect: '/registe' },
    { path: '/registe', component: Registe },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
