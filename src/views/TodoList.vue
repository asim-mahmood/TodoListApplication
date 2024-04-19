<template>
  <div class="row no-gutters">
    <div class="d-flex justify-content-between">
      <div>Logged in as: {{ email }}</div>
      <button type="button" class="btn btn-info" v-if="isAuthenticated" @click="logout">
        logout
      </button>
    </div>
    <div class="text-center mb-4 border-bottom">
      <h1>ToDo List</h1>
    </div>
    <div class="col-md-10">
      <div class="input-group mb-0">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title..."
          v-model="searchQuery"
        />
      </div>
    </div>
    <div class="col-md-2">
      <button
        class="btn btn-primary"
        @click="openTodoModal(null, 'add')"
        data-bs-toggle="modal"
        data-bs-target="#toDoModal"
      >
        Create New ToDo
      </button>
    </div>
    <ul class="list-group mb-3 px-2 pt-3" v-for="(todo, index) in filteredTodos" :key="todo.id">
      <li class="list-group-item">
        <span
          class="cursor-pointer"
          @click="openTodoModal(todo, 'edit')"
          data-bs-toggle="modal"
          data-bs-target="#toDoModal"
          >{{ todo.title }}</span
        >
        <button class="btn btn-sm btn-danger float-end" @click.stop="deleteTodo(todo.id, index)">
          Delete
        </button>
      </li>
    </ul>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <AddTodoModal
      :show-modal="showModal"
      :modalType="modalType"
      :todo="editTodo"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'
import AddTodoModal from './AddTodoModal.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    AddTodoModal
  },
  setup() {
    const router = useRouter()
    const showModal = ref(false)
    const todos = ref([])
    const loading = ref(false)
    const error = ref('')
    const isAuthenticated = ref(false)
    const email = ref('')
    const searchQuery = ref('')
    const token = ref('')
    const editTodo = ref(null)
    const modalType = ref('')

    const openTodoModal = (editTodoData, type) => {
      showModal.value = true
      editTodo.value = editTodoData
      modalType.value = type
    }

    const deleteTodo = async (todoID, index) => {
      try {
        const response = await axios.delete(`http://3.232.244.22/api/item/${todoID}`, {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })

        if (response.status === 200) {
          todos.value.splice(index, 1)
        } else {
          console.error('Failed to delete todo:', response.statusText)
        }
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    }

    const fetchTodos = async () => {
      loading.value = true
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

        const response = await axios.get('http://3.232.244.22/api/items')
        const responseData = response.data
        todos.value = responseData.items.data
      } catch (error) {
        error.value = 'Failed to fetch ToDo items'
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      isAuthenticated.value = false
      email.value = ''
      // Redirect to login page
      // This assumes you have access to the router instance
      router.push('/login')
    }

    const closeModal = () => {
      showModal.value = false
    }

    const filteredTodos = computed(() => {
      const query = searchQuery.value.toLowerCase()
      if (query.trim() !== '') {
        return todos.value.filter((todo) => todo.title.toLowerCase().includes(query))
      } else {
        return todos.value
      }
    })

    // Check if the user is already authenticated
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        token.value = storedToken
        fetchTodos()
        isAuthenticated.value = true
        const storedEmail = localStorage.getItem('email')
        if (storedEmail) {
          email.value = storedEmail
        }
      } else {
        isAuthenticated.value = false
      }
    }

    return {
      showModal,
      todos,
      loading,
      error,
      isAuthenticated,
      email,
      searchQuery,
      token,
      editTodo,
      modalType,
      openTodoModal,
      deleteTodo,
      fetchTodos,
      logout,
      closeModal,
      filteredTodos,
      checkAuth
    }
  },
  created() {
    this.checkAuth()
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
