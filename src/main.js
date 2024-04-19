// Importing CSS files and dependencies
import './assets/main.css' // Importing custom CSS styles
import 'bootstrap/dist/css/bootstrap.min.css' // Importing Bootstrap CSS
import 'bootstrap' // Importing Bootstrap JavaScript
import 'jquery' // Importing jQuery

// Importing necessary modules from Vue
import { createApp } from 'vue'
import App from './App.vue' // Main App component
import router from './router' // Vue Router instance

let isAuthenticated = false // Flag to track user authentication status

// Set up route guards
router.beforeEach((to, from, next) => {
  // Log whether the route requires authentication
  console.log(to.meta.requiresAuth)

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    next('/login')
  } else {
    // Allow navigation to the route
    next()
  }
})

// Create the Vue app instance
const app = createApp(App)

// Use Vue Router
app.use(router)

// Mount the app to the DOM
app.mount('#app')
