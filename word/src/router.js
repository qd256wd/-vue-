import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome"
import Users from "@/components/Users/Users.vue"
import Rights from "@/components/power/Rights"
import Roles from "@/components/power/Roles"
import Cate from "@/components/goods/cate"
import Params from "@/components/goods/Params"
import List from "@/components/goods/List"
import Add from "@/components/goods/Add"

Vue.use(Router)

const router = new Router({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/home", component: Home , redirect:'/welcome',children:[
      { path: "/welcome", component: Welcome },
      { path: "/users", component: Users },
      { path: "/rights", component: Rights },
      { path: "/roles", component: Roles },
      { path: "/categories", component: Cate },
      { path: "/params", component: Params },
      { path: "/goods", component: List },
      { path: "/goods/add", component: Add },
    ]}
  ]
})
router.beforeEach((to , from , next)=>{
  if (to.path === '/login') return next()
  if(window.sessionStorage.getItem('token')) {
    next()
  }else{
    next('/login')
  }
})
export default router
