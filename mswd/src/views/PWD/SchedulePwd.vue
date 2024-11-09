<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Schedule Manager</h1>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Add Schedule Form -->
            <div class="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-gray-800">Request Appointment</h2>
              <form @submit.prevent="addSchedule">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="user">
                    Name
                  </label>
                  <input
                    v-model="newSchedule.user"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="user"
                    type="text"
                    placeholder="Enter your name"
                    required
                  >
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Date and Time
                  </label>
                  <input
                    v-model="newSchedule.date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="date"
                    type="datetime-local"
                    required
                  >
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Appointment Details
                  </label>
                  <textarea
                    v-model="newSchedule.description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    placeholder="Enter appointment details"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    type="submit"
                  >
                    Request Appointment
                  </button>
                </div>
              </form>
            </div>
  
            <!-- Calendar View -->
            <div class="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-gray-800">Calendar View</h2>
              <div class="bg-white p-4 rounded-lg shadow">
                <div class="grid grid-cols-7 gap-2">
                  <div v-for="day in 31" :key="day" class="aspect-square flex items-center justify-center border rounded-lg hover:bg-blue-100 cursor-pointer transition-colors duration-200">
                    {{ day }}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Schedules List -->
          <div class="mt-12">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Upcoming Appointments</h2>
            <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div class="relative">
                <input
                  v-model="searchTerm"
                  class="shadow appearance-none border rounded py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Search appointments..."
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon class="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <select
                v-model="filterDate"
                class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <TransitionGroup name="list" tag="ul" class="space-y-4">
              <li v-for="schedule in filteredSchedules" :key="schedule.id" class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 ease-in-out">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">{{ schedule.user }}</h3>
                    <p class="text-sm text-gray-600">{{ formatDate(schedule.date) }}</p>
                  </div>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Scheduled</span>
                </div>
                <p class="mt-2 text-gray-700">{{ schedule.description }}</p>
              </li>
            </TransitionGroup>
            <p v-if="filteredSchedules.length === 0" class="text-gray-600 text-center py-4">No appointments available.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import { SearchIcon } from 'lucide-vue-next'
  
  const schedules = ref([])
  const newSchedule = ref({
    user: '',
    date: '',
    description: ''
  })
  const searchTerm = ref('')
  const filterDate = ref('all')
  
  const apiBaseUrl = '/api' // Base URL for API requests
  
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/schedules`)
      schedules.value = response.data
    } catch (error) {
      console.error('Error fetching schedules:', error)
      // TODO: Add user-facing error message
    }
  }
  
  const addSchedule = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/Createschedules`, newSchedule.value)
      if (response.data && response.data.id) {
        schedules.value.push({ ...newSchedule.value, id: response.data.id })
        newSchedule.value = { user: '', date: '', description: '' }
        // TODO: Add success message for user
      }
    } catch (error) {
      console.error('Error adding schedule:', error)
      // TODO: Add user-facing error message
    }
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const filteredSchedules = computed(() => {
    let filtered = schedules.value
  
    if (searchTerm.value) {
      const search = searchTerm.value.toLowerCase()
      filtered = filtered.filter(schedule => 
        schedule.user.toLowerCase().includes(search) ||
        schedule.description.toLowerCase().includes(search)
      )
    }
  
    const now = new Date()
    switch (filterDate.value) {
      case 'today':
        filtered = filtered.filter(schedule => new Date(schedule.date).toDateString() === now.toDateString())
        break
      case 'week':
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
        const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6))
        filtered = filtered.filter(schedule => {
          const scheduleDate = new Date(schedule.date)
          return scheduleDate >= weekStart && scheduleDate <= weekEnd
        })
        break
      case 'month':
        filtered = filtered.filter(schedule => 
          new Date(schedule.date).getMonth() === now.getMonth() &&
          new Date(schedule.date).getFullYear() === now.getFullYear()
        )
        break
    }
  
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
  })
  
  onMounted(() => {
    fetchSchedules()
  })
  </script>
  
  <style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>