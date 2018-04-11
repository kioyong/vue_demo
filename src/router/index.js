import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: HelloWorld
    },
    {
      path: '/Foo',
      component: Foo
    },
    {
      path: '/Bar',
      component: Bar
    }
  ]
})
