// Importing necessary modules from Vue Router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token // Returns true if token exists, false otherwise
}

// Route configurations
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // Home view component
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginUser.vue') // Lazy-loaded login view component
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterUser.vue') // Lazy-loaded register view component
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    component: () => import('../views/TodoList.vue') // Lazy-loaded todo list view component
    // meta: { requiresAuth: true } // Uncomment to enable route authentication
  }
]

// Creating router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Set up route guards
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // If route requires authentication and user is not authenticated, redirect to login
    next('/login')
  } else {
    // Allow navigation to the route
    next()
  }
})

// Exporting router instance
export default router
