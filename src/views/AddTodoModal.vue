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
            <h5 class="modal-title" id="toDoModalLabel">
              {{ modalType === 'edit' ? 'Edit Todo' : 'Create New Todo' }}
            </h5>
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
            <button type="button" class="btn btn-outline-primary px-4" @click="performAction">
              {{ modalType === 'edit' ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue' // Import ref from Vue 3
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  props: {
    showModal: Boolean,
    modalType: String,
    todo: Object
  },
  setup(props) {
    const router = useRouter()
    const title = ref(props.todo ? props.todo.title : '') // Initialize title with todo title if provided
    const description = ref(props.todo ? props.todo.description : '') // Initialize description with todo description if provided

    const performAction = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
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

        // Redirect to todo list
        router.push('/todo-list')

        // Close the modal
        // closeModal()
      } catch (error) {
        console.error('Error:', error)
        // Handle error
      }
    }

    // const closeModal = () => {
    //   // Emit event to close the modal
    //   emit('close-modal')
    // }

    return { title, description, performAction } // Expose variables and methods to the template
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
