<script>
import AddTodoModal from './AddTodoModal.vue'
import axios from 'axios'
export default {
  components: {
    AddTodoModal
  },
  data() {
    return {
      showModal: false,
      todos: [], // Array to store ToDo items
      loading: false,
      error: ''
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    async fetchTodos() {
      this.loading = true
      try {
        const response = await axios.get('http://3.232.244.22/api/items')
        this.todos = response.data // Update todos array with fetched data
      } catch (error) {
        this.error = 'Failed to fetch ToDo items' // Handle error
      } finally {
        this.loading = false // Hide loading indicator
      }
    },
    closeModal() {
      this.showModal = false
    }
  },
  mounted() {
    this.fetchTodos() // Fetch ToDo items when the component is mounted
  }
}
</script>
<template>
  <div class="row no-gutters">
    <div class="text-center mb-4 border-bottom">
      <h1>ToDo List</h1>
    </div>
    <div class="col-md-10">
      <div class="input-group mb-0">
        <input type="text" class="form-control" placeholder="Search by title..." />
        <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
      </div>
    </div>
    <div class="col-md-2">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#toDoModal"
        @click="goToCreateTodo"
      >
        Create New ToDo
      </button>
    </div>
    <ul class="list-group mb-3">
      <li
        class="list-group-item"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @click="viewTodo(todo)"
      >
        {{ todo.title }}
        <button class="btn btn-sm btn-danger float-end" @click.stop="deleteTodo(todo)">
          Delete
        </button>
      </li>
    </ul>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <add-todo-modal :show-modal="showModal" @close-modal="closeModal" />
  </div>
</template>
