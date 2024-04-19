<template>
  <!-- Modal for creating or editing todo -->
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
            <!-- Modal title -->
            <h5 class="modal-title" id="toDoModalLabel">
              <!-- Displaying appropriate title based on modalType -->
              {{ modalType === 'edit' ? 'Edit Todo' : 'Create New Todo' }}
            </h5>
            <!-- Close button -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Input fields for title and description -->
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
            <!-- Close button -->
            <button
              type="button"
              class="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <!-- Button to perform action (create/update) -->
            <button type="button" class="btn btn-outline-primary px-4" @click="performAction">
              <!-- Displaying appropriate action based on modalType -->
              {{ modalType === 'edit' ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing necessary modules
import { ref } from 'vue' // Import ref from Vue 3
import { useRouter } from 'vue-router' // Import useRouter from Vue Router
import axios from 'axios' // Import axios for making HTTP requests

export default {
  // Props for controlling modal behavior and passing todo data
  props: {
    showModal: Boolean,
    modalType: String,
    todo: Object
  },
  setup(props) {
    const router = useRouter() // Accessing Vue Router
    const title = ref(props.todo ? props.todo.title : '') // Reactive reference for todo title
    const description = ref(props.todo ? props.todo.description : '') // Reactive reference for todo description

    // Function to perform create/update action
    const performAction = async () => {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Set authorization header
          }
        }

        if (props.modalType === 'edit') {
          // Update todo
          const response = await axios.put(
            `http://3.232.244.22/api/item/${props.todo.id}`,
            {
              title: title.value,
              description: description.value
            },
            config
          )
          console.log('Response from API:', response.data)
        } else {
          // Create new todo
          const response = await axios.post(
            'http://3.232.244.22/api/item',
            {
              title: title.value,
              description: description.value
            },
            config
          )
          console.log('Response from API:', response.data)
        }

        // Redirect to todo list after action
        router.push('/todo-list')

        // Close the modal after action
        closeModal()
      } catch (error) {
        console.error('Error:', error)
        // Handle error
      }
    }

    // Function to close the modal
    const closeModal = () => {
      const modal = document.getElementById('toDoModal')
      modal.classList.remove('show') // Remove 'show' class to hide the modal
      modal.setAttribute('aria-hidden', 'true') // Set aria-hidden attribute to true
      modal.style.display = 'none' // Hide the modal by setting display style to 'none'
      const backdrop = document.getElementsByClassName('modal-backdrop')[0] // Remove modal backdrop
      document.body.removeChild(backdrop)
    }

    // Expose variables and methods to the template
    return { title, description, performAction }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
