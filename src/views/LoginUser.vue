<template>
  <!-- Login form -->
  <div class="row justify-content-center align-items-center welcome-screen">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <!-- Title -->
          <h1>Login to Todo List App</h1>
        </div>
        <div class="card-body">
          <!-- Login Form -->
          <form @submit.prevent="login">
            <!-- Error message display -->
            <div v-if="error" class="text-danger mt-2 text-center">{{ error }}</div>
            <!-- Email input field -->
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" required />
            </div>
            <!-- Password input field -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
            </div>
            <!-- Login button -->
            <div class="d-grid gap-2 border-top">
              <button type="submit" class="btn btn-outline-primary">Login</button>
            </div>
          </form>
          <!-- Check if already authenticated -->
          <div v-if="isAuthenticated()">You are already logged in!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // Importing ref function from Vue 3
import axios from 'axios' // Importing axios for making HTTP requests
import { useRouter } from 'vue-router'

// Data properties using ref() function
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

// Login method to handle form submission
const login = async () => {
  try {
    // Send POST request to login endpoint
    const response = await axios.post('http://3.232.244.22/api/login', {
      email: email.value,
      password: password.value
    })

    // Assuming the API returns a token upon successful login
    const token = response.data.user.token

    // Handle successful login, e.g., store token in local storage
    localStorage.setItem('token', token)
    localStorage.setItem('email', response.data.user.email)

    // Redirect to the desired route after successful login
    // Assuming router is provided by Vue Router
    router.push('/todo-list')
  } catch (error) {
    // Handle login error
    if (error.response && error.response.status === 401) {
      // Unauthorized - Invalid email or password
      error.value = 'Invalid email or password'
    } else {
      // Other error (e.g., network error)
      error.value = 'An error occurred while logging in'
    }
  }
}

// Method to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}
</script>
