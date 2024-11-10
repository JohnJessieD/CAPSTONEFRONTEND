<template>
  <div class="mswd-schedule-manager">
    <div class="container">
      <header>
        <img src="/placeholder.svg?height=80&width=80" alt="MSWD Logo" class="logo" />
        <h1>MSWD Schedule Manager</h1>
        <p>Municipal Social Welfare and Development Office</p>
      </header>

      <div class="content-grid">
        <!-- Request Appointment Form -->
        <div class="appointment-form">
          <h2>
            <CalendarPlusIcon class="icon" />
            Request Appointment
          </h2>
          <form @submit.prevent="addSchedule">
            <div class="form-group">
              <label for="user">Full Name</label>
              <input
                v-model="newSchedule.user"
                id="user"
                type="text"
                placeholder="Enter your full name"
                required
              >
            </div>
            <div class="form-group">
              <label for="date">Preferred Date and Time</label>
              <input
                v-model="newSchedule.date"
                id="date"
                type="datetime-local"
                required
              >
            </div>
            <div class="form-group">
              <label for="description">Appointment Details</label>
              <textarea
                v-model="newSchedule.description"
                id="description"
                placeholder="Please provide any additional information"
                rows="3"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Request Appointment' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Calendar View -->
        <div class="calendar-view">
          <h2>
            <CalendarIcon class="icon" />
            Calendar View
          </h2>
          <div class="calendar-header">
            <button @click="previousMonth" class="calendar-nav-btn">
              <ChevronLeftIcon />
            </button>
            <h3>{{ currentMonthYear }}</h3>
            <button @click="nextMonth" class="calendar-nav-btn">
              <ChevronRightIcon />
            </button>
          </div>
          <div class="calendar-grid">
            <div v-for="day in calendarDays" :key="day.date" 
                 :class="['calendar-day', { 'current-month': day.currentMonth, 'has-appointments': day.hasAppointments }]">
              {{ day.dayOfMonth }}
              <div v-if="day.hasAppointments" class="appointment-indicator"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedules List -->
      <div class="schedules-list">
        <h2>
          <ClipboardListIcon class="icon" />
          Upcoming Appointments
        </h2>
        <div class="filter-controls">
          <div class="search-box">
            <SearchIcon class="search-icon" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search appointments..."
            >
          </div>
          <select v-model="filterDate">
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <transition-group name="list" tag="ul" class="schedules">
          <li v-for="schedule in filteredSchedules" :key="schedule.id" class="schedule-item">
            <div class="schedule-header">
              <div>
                <h3>{{ schedule.user }}</h3>
                <p>{{ formatDate(schedule.date) }}</p>
              </div>
              <span class="status">Scheduled</span>
            </div>
            <p class="schedule-description">{{ schedule.description }}</p>
          </li>
        </transition-group>
        <p v-if="filteredSchedules.length === 0" class="no-appointments">No appointments available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { 
  SearchIcon, 
  CalendarIcon, 
  CalendarPlusIcon, 
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'

const schedules = ref([])
const newSchedule = ref({
  user: '',
  date: '',
  description: ''
})
const searchTerm = ref('')
const filterDate = ref('all')
const isSubmitting = ref(false)
const currentDate = ref(new Date())

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
  if (isSubmitting.value) return

  isSubmitting.value = true
  try {
    const response = await axios.post(`${apiBaseUrl}/Createschedules`, newSchedule.value)
    if (response.data && response.data.id) {
      schedules.value.push({ ...newSchedule.value, id: response.data.id })
      newSchedule.value = { user: '', date: '', description: '' }
      alert('Appointment scheduled successfully!') // TODO: Replace with a more user-friendly notification
    }
  } catch (error) {
    console.error('Error adding schedule:', error)
    alert('Failed to schedule appointment. Please try again.') // TODO: Replace with a more user-friendly error message
  } finally {
    isSubmitting.value = false
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

const currentMonthYear = computed(() => {
  const options = { year: 'numeric', month: 'long' }
  return currentDate.value.toLocaleDateString(undefined, options)
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add days from previous month
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = new Date(year, month, -i)
    days.push({
      date: day,
      dayOfMonth: day.getDate(),
      currentMonth: false,
      hasAppointments: hasAppointmentsOnDate(day)
    })
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i)
    days.push({
      date: day,
      dayOfMonth: i,
      currentMonth: true,
      hasAppointments: hasAppointmentsOnDate(day)
    })
  }

  // Add days from next month
  const remainingDays = 42 - days.length // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i)
    days.push({
      date: day,
      dayOfMonth: i,
      currentMonth: false,
      hasAppointments: hasAppointmentsOnDate(day)
    })
  }

  return days
})

const hasAppointmentsOnDate = (date) => {
  return schedules.value.some(schedule => {
    const scheduleDate = new Date(schedule.date)
    return scheduleDate.toDateString() === date.toDateString()
  })
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

onMounted(() => {
  fetchSchedules()
})

watch(schedules, () => {
  // Recalculate calendar days when schedules change
  calendarDays.value = calendarDays.value
}, { deep: true })
</script>

<style scoped>
.mswd-schedule-manager {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2fe, #e0e7ff);
  padding: 2rem 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  color: #1e40af;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.appointment-form, .calendar-view {
  background-color: #f0f9ff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

input, textarea, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

button {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

button:hover {
  background-color: #2563eb;
}

button:active {
  transform: translateY(1px);
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-nav-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #4b5563;
  position: relative;
  transition: background-color 0.3s;
}

.calendar-day:hover {
  background-color: #f3f4f6;
}

.calendar-day.current-month {
  background-color: #f0f9ff;
}

.calendar-day.has-appointments {
  color: #3b82f6;
  font-weight: bold;
}

.appointment-indicator {
  width: 6px;
  height: 6px;
  background-color: #3b82f6;
  border-radius: 50%;
  position: absolute;
  bottom: 4px;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.search-box {
  position: relative;
  flex-grow: 1;
  margin-right: 1rem;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input {
  padding-left: 2rem;
}

.schedules {
  list-style-type: none;
  padding: 0;
}

.schedule-item {
  background-color: #ffffff;
  border-left: 4px solid #3b82f6;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.schedule-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.schedule-header h3 {
  font-size: 1.1rem;
  color: #1f2937;
  margin: 0;
}

.schedule-header p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.status {
  background-color: #dbeafe;
  color: #1e40af;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.schedule-description {
  color: #4b5563;
  font-size: 0.95rem;
}

.no-appointments {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    flex-direction: column;
  }

  .search-box {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>