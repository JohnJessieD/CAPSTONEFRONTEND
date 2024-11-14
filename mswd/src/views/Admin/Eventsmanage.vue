<template>
    <div class="event-manager">
      <div class="container">
        <header class="header">
          <h1>Event Manager</h1>
          <p>Organize your events with style and ease</p>
        </header>
  
        <main class="content">
          <button @click="toggleForm" class="btn btn-primary btn-large">
            <component :is="isFormOpen ? 'XIcon' : 'PlusIcon'" class="icon" />
            {{ isFormOpen ? 'Close Form' : (editingEvent ? 'Edit Event' : 'Add New Event') }}
          </button>
  
          <transition name="slide-fade">
            <form v-if="isFormOpen" @submit.prevent="submitEvent" class="event-form">
              <div class="form-group">
                <label for="title">Event Title</label>
                <input
                  id="title"
                  v-model="event.title"
                  type="text"
                  required
                  placeholder="Enter event title"
                >
              </div>
              <div class="form-group">
                <label for="description">Event Description</label>
                <textarea
                  id="description"
                  v-model="event.description"
                  rows="3"
                  required
                  placeholder="Describe your event"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="category">Category</label>
                <select
                  id="category"
                  v-model="event.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="pwd">PWD</option>
                  <option value="solo_parents">Solo Parents</option>
                  <option value="senior_citizen">Senior Citizen</option>
                </select>
              </div>
              <div class="form-group">
                <label for="event_date">Event Date</label>
                <input
                  id="event_date"
                  v-model="event.event_date"
                  type="date"
                  required
                >
              </div>
              <div class="form-actions">
                <button
                  type="button"
                  @click="cancelEdit"
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="btn btn-primary"
                >
                  {{ isLoading ? 'Processing...' : (editingEvent ? 'Update Event' : 'Add Event') }}
                </button>
              </div>
            </form>
          </transition>
  
          <transition name="fade">
            <div v-if="message" :class="['message', messageType]">
              {{ message }}
            </div>
          </transition>
  
          <section class="events-list">
            <h2>Upcoming Events</h2>
            <div v-if="isLoading" class="loader"></div>
            <p v-else-if="events.length === 0" class="no-events">
              No events found. Add your first event above!
            </p>
            <transition-group name="event-list" tag="div" class="event-grid">
              <div
                v-for="event in events"
                :key="event.id"
                class="event-card"
              >
                <div class="event-card-content">
                  <h3>{{ event.title }}</h3>
                  <p>{{ event.description }}</p>
                  <div class="event-meta">
                    <span class="category" :class="event.category">{{ getCategoryLabel(event.category) }}</span>
                    <span class="date">{{ formatDate(event.event_date) }}</span>
                  </div>
                </div>
                <div class="event-actions">
                  <button
                    @click="editEvent(event)"
                    class="btn btn-icon"
                    aria-label="Edit event"
                  >
                    <Edit2Icon />
                  </button>
                  <button
                    @click="deleteEvent(event.id)"
                    class="btn btn-icon delete"
                    aria-label="Delete event"
                  >
                    <Trash2Icon />
                  </button>
                </div>
              </div>
            </transition-group>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import axios from 'axios'
  import { XIcon, PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-vue-next'
  
  const events = ref([])
  const event = ref({
    title: '',
    description: '',
    category: '',
    event_date: ''
  })
  const editingEvent = ref(null)
  const isLoading = ref(false)
  const message = ref('')
  const messageType = ref('')
  const isFormOpen = ref(false)
  
  const fetchEvents = async () => {
    isLoading.value = true
    try {
      const response = await axios.get('https://stmsdapp.space/api/events')
      events.value = response.data
    } catch (error) {
      showMessage('Error fetching events. Please try again.', 'error')
      console.error('Error fetching events:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const submitEvent = async () => {
    isLoading.value = true
    try {
      if (editingEvent.value) {
        await axios.post(`https://stmsdapp.space/api/events/${editingEvent.value.id}`, event.value)
        showMessage('Event updated successfully!', 'success')
      } else {
        await axios.post('https://stmsdapp.space/api/events', event.value)
        showMessage('Event added successfully!', 'success')
      }
      await fetchEvents()
      resetForm()
      isFormOpen.value = false
    } catch (error) {
      showMessage('Error submitting event. Please try again.', 'error')
      console.error('Error submitting event:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const deleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    
    isLoading.value = true
    try {
      await axios.delete(`https://stmsdapp.space/api/events/${id}`)
      showMessage('Event deleted successfully!', 'success')
      await fetchEvents()
    } catch (error) {
      showMessage('Error deleting event. Please try again.', 'error')
      console.error('Error deleting event:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const editEvent = (eventToEdit) => {
    event.value = { ...eventToEdit }
    editingEvent.value = eventToEdit
    isFormOpen.value = true
  }
  
  const cancelEdit = () => {
    resetForm()
    isFormOpen.value = false
  }
  
  const resetForm = () => {
    event.value = {
      title: '',
      description: '',
      category: '',
      event_date: ''
    }
    editingEvent.value = null
  }
  
  const showMessage = (text, type) => {
    message.value = text
    messageType.value = type
    setTimeout(() => {
      message.value = ''
      messageType.value = ''
    }, 3000)
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const toggleForm = () => {
    isFormOpen.value = !isFormOpen.value
    if (!isFormOpen.value) {
      resetForm()
    }
  }
  
  const getCategoryLabel = (category) => {
    const labels = {
      pwd: 'PWD',
      solo_parents: 'Solo Parents',
      senior_citizen: 'Senior Citizen'
    }
    return labels[category] || category
  }
  
  fetchEvents()
  </script>
  
  <style scoped>
  .event-manager {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f6f9fc 0%, #e9f1f7 100%);
    min-height: 100vh;
    padding: 2rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #ffffff;
    padding: 3rem 2rem;
    text-align: center;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .header p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .content {
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }
  
  .btn-primary {
    background-color: #6366f1;
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background-color: #4f46e5;
  }
  
  .btn-secondary {
    background-color: #e2e8f0;
    color: #4a5568;
  }
  
  .btn-secondary:hover {
    background-color: #cbd5e0;
  }
  
  .btn-large {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .event-form {
    background-color: #f8fafc;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .message {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .message.success {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .message.error {
    background-color: #fed7d7;
    color: #9b2c2c;
  }
  
  .events-list h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #2d3748;
  }
  
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .no-events {
    text-align: center;
    color: #718096;
    font-style: italic;
    padding: 2rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
  }
  
  .event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .event-card {
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .event-card-content {
    padding: 1.5rem;
    flex-grow: 1;
  }
  
  .event-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: #2d3748;
  }
  
  .event-card p {
    color: #718096;
    margin-bottom: 1rem;
  }
  
  .event-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  
  .category {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .category.pwd {
    background-color: #ebf4ff;
    color: #4299e1;
  }
  
  .category.solo_parents {
    background-color: #fefcbf;
    color: #d69e2e;
  }
  
  .category.senior_citizen {
    background-color: #feebc8;
    color: #dd6b20;
  }
  
  .date {
    color: #718096;
    font-size: 0.875rem;
  }
  
  .event-actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 1.5rem;
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }
  
  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: #4a5568;
    transition: color 0.3s ease;
    border-radius: 0.375rem;
  }
  
  .btn-icon:hover {
    color: #2d3748;
    background-color: #e2e8f0;
  }
  
  .btn-icon.delete:hover {
    color: #e53e3e;
    background-color: #fed7d7;
  }
  
  /* Transitions */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .event-list-enter-active,
  .event-list-leave-active {
    transition: all 0.5s ease;
  }
  
  .event-list-enter-from,
  .event-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .event-list-move {
    transition: transform 0.5s ease;
  }
  
  @media (max-width: 768px) {
    .event-manager {
      padding: 1rem;
    }
  
    .header {
      padding: 2rem 1rem;
    }
  
    .header h1 {
      font-size: 2.5rem;
    }
  
    .content {
      padding: 1.5rem;
    }
  
    .event-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>