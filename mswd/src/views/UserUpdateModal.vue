<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="close-button">&times;</button>
        <h2 class="modal-title">Update User Information</h2>
        <form @submit.prevent="updateUser" class="update-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" v-model="form.username" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required>
          </div>
          <div class="form-group">
            <label for="password">New Password (optional)</label>
            <input id="password" v-model="form.password" type="password">
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" v-model="form.category" required>
              <option value="" disabled>Select a category</option>
              <option value="pwd">PWD</option>
              <option value="solo parent">Solo Parent</option>
              <option value="senior citizen">Senior Citizen</option>
            </select>
          </div>
          <button type="submit" :disabled="isLoading" class="submit-button">
            {{ isLoading ? 'Updating...' : 'Update' }}
          </button>
        </form>
        <p v-if="message" :class="['message', { 'error': isError }]">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    isOpen: Boolean,
    userId: String,
  })
  
  const emit = defineEmits(['close', 'updated'])
  
  const form = reactive({
    username: '',
    email: '',
    password: '',
    category: ''
  })
  
  const isLoading = ref(false)
  const message = ref('')
  const isError = ref(false)
  
  const closeModal = () => {
    emit('close')
  }
  
  const updateUser = async () => {
    isLoading.value = true
    message.value = ''
    isError.value = false
  
    try {
      const response = await axios.put('/api/user', form, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
  
      if (response.status === 200) {
        message.value = 'User information updated successfully!'
        emit('updated', response.data)
        setTimeout(() => {
          closeModal()
        }, 2000)
      }
    } catch (error) {
      isError.value = true
      message.value = error.response?.data?.message || 'An error occurred while updating user information'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1a73e8;
  }
  
  .update-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  input, select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .submit-button {
    background-color: #1a73e8;
    color: #ffffff;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #1557b0;
  }
  
  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .message {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    text-align: center;
  }
  
  .message.error {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .message:not(.error) {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  </style>