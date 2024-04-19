<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://3.232.244.22/api/login', {
          email: this.email,
          password: this.password
        })
        console.log('Response:', response)
        // Assuming the API returns a token upon successful login
        const token = response.data.token

        // Log the received token
        console.log('Received token:', token)

        // Handle successful login, e.g., store token in local storage
        localStorage.setItem('token', token)

        // Redirect to the desired route after successful login
        this.$router.push('/todo-list')
      } catch (error) {
        // Handle login error
        if (error.response && error.response.status === 401) {
          // Unauthorized - Invalid email or password
          this.error = 'Invalid email or password'
        } else {
          // Other error (e.g., network error)
          this.error = 'An error occurred while logging in'
        }
      }
    }
  }
}
</script>
<template>
  <div class="row justify-content-center align-items-center welcome-screen">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h1>Login to Todo List App</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="login">
            <div v-if="error" class="text-danger mt-2 text-center">{{ error }}</div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" required />
            </div>
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
            <div class="d-grid gap-2 border-top">
              <button type="submit" class="btn btn-outline-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
