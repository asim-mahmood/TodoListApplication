<script setup></script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div>
      <h1 class="text-center mb-4">Welcome to Todo List App</h1>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Choose an option:</h5>
          <div class="d-grid gap-2">
            <router-link to="/login" class="btn btn-primary btn-lg">Login</router-link>
            <router-link to="/register" class="btn btn-success btn-lg">Register</router-link>
            <!-- <router-link to="/todo-list" class="btn btn-success btn-lg">Register</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
