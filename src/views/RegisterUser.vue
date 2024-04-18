<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
      successMessage: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirmation) {
        this.error = 'Password Confirmation do not match'
        return
      }

      try {
        const formData = new FormData()
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('password_confirmation', this.passwordConfirmation)

        const response = await axios.post('http://3.232.244.22/api/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          }
        })

        // Assuming the API returns a success message or status
        this.successMessage = response.data.message

        // Reset error message
        this.error = ''

        // Redirect to the login screen after a delay
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000) // Redirect after 2 seconds
      } catch (error) {
        if (
          error.response &&
          error.response.data.error.includes('The email has already been Registered.')
        ) {
          // Handle the specific error when the email is already taken
          this.error = 'The email has already been Registered'
        } else {
          // Handle other errors
          this.error = 'Registration failed. Please try again.'
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
          <h1 class="text-center">Register to Todo List App</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
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
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <div class="d-grid gap-2 border-top">
              <button type="submit" class="btn btn-outline-success px-5 mt-3">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
