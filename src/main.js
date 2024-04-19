import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'jquery'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
let isAuthenticated = false

// Create the Vue app instance

// Set up route guards
router.beforeEach((to, from, next) => {
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

const app = createApp(App)
app.use(router)

app.mount('#app')
