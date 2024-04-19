<!-- toDoModal.vue -->
<template>
  <div>
    <div
      class="modal fade"
      id="toDoModal"
      tabindex="-1"
      aria-labelledby="toDoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="toDoModalLabel">Create New To-do</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="todoTitle" class="form-label">Title</label>
              <input type="text" class="form-control" id="todoTitle" v-model="title" required />
            </div>
            <div class="mb-3">
              <label for="todoDescription" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="todoDescription"
                v-model="description"
                required
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-outline-primary px-4" @click="createToDo">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    async createToDo() {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const response = await axios.post(
          'http://3.232.244.22/api/item',
          {
            title: this.title,
            description: this.description
          },
          config
        )

        console.log('Response from API:', response.data)

        // Redirect to ToDo list screen after successfully creating the ToDo item
        this.$router.push('/todo-list')

        // Close the modal
        this.$emit('close-modal')
      } catch (error) {
        console.error('Error creating ToDo:', error)
        // Handle error (e.g., display error message to the user)
      }
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
