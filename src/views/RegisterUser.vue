<template>
  <!-- Register form -->
  <div class="row justify-content-center align-items-center welcome-screen">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <!-- Title -->
          <h1 class="text-center">Register to Todo List App</h1>
        </div>
        <div class="card-body">
          <!-- Registration Form -->
          <form @submit.prevent="register">
            <!-- Success message display -->
            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
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
            <!-- Confirm Password input field -->
            <div class="mb-3">
              <label for="passwordConfirmation" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="passwordConfirmation"
                v-model="passwordConfirmation"
                required
              />
            </div>
            <!-- Error message display -->
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <!-- Register button -->
            <div class="d-grid gap-2 border-top">
              <button type="submit" class="btn btn-outline-success px-5 mt-3">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // Importing ref function from Vue 3
import { useRouter } from 'vue-router'
import axios from 'axios' // Importing axios for making HTTP requests

// Data properties using ref() function
const router = useRouter()
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')
const successMessage = ref('')

// Register method to handle form submission
const register = async () => {
  // Check if password matches confirmation
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Password Confirmation do not match'
    return
  }

  try {
    // Create form data object
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('password_confirmation', passwordConfirmation.value)

    // Send POST request to register endpoint
    const response = await axios.post('http://3.232.244.22/api/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    })

    // Display success message
    successMessage.value = response.data.message

    // Reset error message
    error.value = ''

    // Redirect to login screen after a delay
    setTimeout(() => {
      // Assuming router is provided by Vue Router
      router.push('/login')
    }, 2000) // Redirect after 2 seconds
  } catch (error) {
    // Handle registration errors
    if (
      error.response &&
      error.response.data.error.includes('The email has already been Registered.')
    ) {
      // Handle specific error when email is already taken
      error.value = 'The email has already been Registered'
    } else {
      // Handle other errors
      error.value = 'Registration failed. Please try again.'
    }
  }
}
</script>
