import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUser.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterUser.vue')
    },
    {
      path: '/todo-list',
      name: 'todo-list',
      component: () => import('../views/TodoList.vue')
    }
  ]
})
const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token // Returns true if token exists, false otherwise
}

// Before each navigation, check if route requires authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // If route requires authentication and user is not authenticated, redirect to login
    next('/login')
  } else {
    // Continue with navigation
    next()
  }
})

export default router
