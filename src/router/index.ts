import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomePage.vue'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminPanel.vue'
import NotFound from '../components/NotFound.vue'
import { auth } from '../firebase/config'

const requireAuth = (to: any, from: any, next: any) => {
  const user = auth.currentUser
  if (!user) {
    next( '/login' )
  } else {
    next()
  }
}

const requireNoAuth = (to: any, from: any, next: any) => {
  let user = auth.currentUser
  if (user) {
    next( '/admin' )
  } else {
    next()
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireAuth
  },
  {
    path: "/:pathMatch(.*)*",
    name: '404',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
