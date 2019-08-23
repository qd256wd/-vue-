import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/main.vue'
import Demand from './components/demand.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Demand
    },
  ]
})
