<script setup></script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center welcome-screen">
    <div>
      <h1 class="text-center mb-5">Welcome to Todo List App</h1>
      <div class="card shadow">
        <div class="card-body p-5">
          <div class="d-grid gap-3">
            <p>Already have an Account?Login</p>
            <router-link to="/login" class="btn btn-outline-primary btn-lg rounded-pill"
              >Login</router-link
            >
            <p class="mt-3">New Users Register to Access Todo App</p>
            <router-link to="/register" class="btn btn-outline-success btn-lg rounded-pill"
              >Register</router-link
            >
            <!-- <router-link to="/todo-list" class="btn btn-success btn-lg">Register</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-screen {
  height: 80vh;
}
</style>
