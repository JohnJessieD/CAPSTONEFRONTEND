<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
        <router-link 
          v-for="(item, index) in navItems" 
          :key="index" 
          :to="item.route" 
          class="nav-link"
          :class="{ 'active': currentRoute === item.route }"
        >
          <component :is="item.icon" :size="24" />
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </router-link>
      </nav>
      <div class="user-info">
        <span v-if="!isCollapsed" class="user-name">Admin User</span>
        <button class="logout-button">
          <LogOut :size="20" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
      <button class="toggle-button" @click="toggleSidebar">
        <ChevronLeft v-if="!isCollapsed" :size="20" />
        <ChevronRight v-else :size="20" />
      </button>
    </aside>
    
    <main class="main-content" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="top-bar">
        <h1 class="page-title">Assistance Management</h1>
        <div class="actions">
          <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="Search requests...">
            <Search :size="20" />
          </div>
          <div class="notifications">
            <button @click="toggleNotifications" class="notifications-toggle">
              <Bell :size="24" />
              <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
            </button>
            <transition name="fade">
              <div v-if="showNotifications" class="notifications-panel">
                <h3>Notifications</h3>
                <div class="notifications-list">
                  <div v-for="notification in notifications" :key="notification.id" 
                      :class="['notification-item', { 'unread': !notification.is_read }]">
                    <div class="notification-icon">
                      <component :is="getNotificationIcon(notification.type)" :size="24" />
                    </div>
                    <div class="notification-content">
                      <p class="notification-message">{{ notification.message }}</p>
                      <p class="notification-time">{{ formatTime(notification.created_at) }}</p>
                    </div>
                    <button v-if="!notification.is_read" @click="markAsRead(notification.id)" class="mark-read-button">
                      <Check :size="16" />
                    </button>
                  </div>
                </div>
                <button v-if="notifications.length > 0" @click="markAllAsRead" class="mark-all-read-button">
                  Mark all as read
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
            <p>Loading requests...</p>
          </div>
          <div v-else-if="filteredRequests.length === 0" class="no-results">
            <FileQuestion :size="48" />
            <p>No assistance requests found</p>
          </div>
          <div v-else class="request-grid">
            <div v-for="(request, index) in filteredRequests" :key="index" class="request-card">
              <div class="request-header">
                <img :src="request.image" :alt="`Request from ${request.name}`" class="request-image" />
                <h3 class="request-name">{{ request.name }}</h3>
              </div>
              <div class="request-details">
                <p>
                  <DollarSign :size="16" />
                  <strong>Amount:</strong> {{ formatCurrency(request.amount) }}
                </p>
                <p>
                  <FileText :size="16" />
                  <strong>Reason:</strong> {{ request.reason || 'No reason provided' }}
                </p>
                <p>
                  <Calendar :size="16" />
                  <strong>Requested:</strong> {{ formatTime(request.created_at) || 'Unknown date' }}
                </p>
              </div>
              <div class="request-actions">
                <button @click="acceptRequest(request)" class="accept-button">
                  <Check :size="16" />
                  Accept
                </button>
                <button @click="rejectRequest(request)" class="reject-button">
                  <X :size="16" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Home, Calendar, HandsHelping, CreditCard, Users, LogOut, 
  ChevronLeft, ChevronRight, Bell, Check, AlertCircle, UserPlus,
  Search, FileQuestion, DollarSign, FileText, X
} from 'lucide-vue-next'
import axios from 'axios'

const route = useRoute()
const currentRoute = computed(() => route.path)

const isCollapsed = ref(false)
const requestHistory = ref([])
const isLoading = ref(false)
const notifications = ref([])
const showNotifications = ref(false)
const searchQuery = ref('')

const navItems = [
  { name: 'Dashboard', route: '/Dashboard' },
  { name: 'Schedule', route: '/Schedule' },
  { name: 'Barangay Management', route: '/Barangaym' },
  { name: 'AssistanceManagement', route: '/AssistanceManagement' },
  { name: 'Card Management', route: '/CardManagement' },
  { name: 'User Management', route: '/user-management' },
  { name: 'Publication Manager', route: '/PublicationManager' },
  { name: 'Events Manager', route: '/EventsManager' },
  { name: 'Feedback List', route: '/FeedbackList' },
]
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const fetchRequestHistory = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('/api/PWD')
    requestHistory.value = response.data.map(request => ({
      ...request,
      name: request.name || 'Unknown',
      reason: request.reason || 'No reason provided'
    }))
  } catch (error) {
    console.error('Error fetching request history:', error)
    requestHistory.value = []
  } finally {
    isLoading.value = false
  }
}

const acceptRequest = async (request) => {
  try {
    const response = await axios.post('/api/acceptRequest', { requestId: request.id })
    console.log('Request accepted:', response.data)
    requestHistory.value = requestHistory.value.filter(r => r.id !== request.id)
    await fetchNotifications()
  } catch (error) {
    console.error('Error accepting request:', error)
  }
}
const rejectRequest = async (request) => {
  try {
    // Ensure the payload structure matches what PHP expects
    const response = await axios.post('/api/rejectRequest', { requestId: request.id });

    // Log and update the UI based on response
    console.log('Request rejected:', response.data);

    // Update the request history to remove the rejected request
    requestHistory.value = requestHistory.value.filter(r => r.id !== request.id);

    // Fetch updated notifications
    await fetchNotifications();
  } catch (error) {
    console.error('Error rejecting request:', error);
  }
};

const fetchNotifications = async () => {
  try {
    const response = await axios.get('/api/getNotifications')
    notifications.value = response.data
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

const markAsRead = async (id) => {
  try {
    await axios.post(`/api/markNotificationAsRead/${id}`)
    await fetchNotifications()
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

const markAllAsRead = async () => {
  try {
    await Promise.all(notifications.value.filter(n => !n.is_read).map(n => markAsRead(n.id)))
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.is_read).length
})

const getNotificationIcon = (type) => {
  switch (type) {
    case 'assistance':
      return HandsHelping
    case 'membership':
      return UserPlus
    default:
      return AlertCircle
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    return 'N/A'
  }
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount)
}

const filteredRequests = computed(() => {
  return requestHistory.value.filter(request =>
    (request.name?.toLowerCase() || '').includes(searchQuery.value.toLowerCase()) ||
    (request.reason?.toLowerCase() || '').includes(searchQuery.value.toLowerCase())
  )
})

onMounted(() => {
  fetchRequestHistory()
  fetchNotifications()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Inter', sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  border-radius: 5px;
  margin-bottom: 5px;
}

.nav-link:hover, .nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link svg {
  margin-right: 10px;
}

.user-info {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-name {
  margin-bottom: 10px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-button {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-button svg {
  margin-right: 5px;
}

.toggle-button {
  position: absolute;
  top: 10px;
  right: -15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #45a049;
}

.main-content {
  flex-grow: 1;
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  color: #1a5f7a;
  margin: 0;
}

.actions {
  display: flex;
  align-items: center;
}

.search-bar {
  position: relative;
  margin-right: 20px;
}

.search-bar input {
  padding: 10px 15px 10px 40px;
  border: 1px solid #e0e7ff;
  border-radius: 20px;
  font-size: 14px;
  width: 250px;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #1a5f7a;
  box-shadow: 0 0 0 2px rgba(26, 95, 122, 0.2);
}

.search-bar svg {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.notifications {
  position: relative;
}

.notifications-toggle {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.unread-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}

.notifications-panel {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 350px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
}

.notifications-panel h3 {
  padding: 15px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
  font-size: 18px;
  color: #2d3748;
}

.notifications-list {
  padding: 10px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f7fafc;
}

.notification-item.unread {
  background-color: #ebf8ff;
}

.notification-icon {
  margin-right: 12px;
  color: #1a5f7a;
}

.notification-content {
  flex-grow: 1;
}

.notification-message {
  margin: 0 0 5px;
  font-size: 14px;
  color: #2d3748;
}

.notification-time {
  margin: 0;
  font-size: 12px;
  color: #718096;
}

.mark-read-button {
  background: none;
  border: none;
  color: #1a5f7a;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
}

.mark-all-read-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #1a5f7a;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.mark-all-read-button:hover {
  background-color: #2c7da0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
}

.request-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.request-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.request-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.request-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.request-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
}

.request-name {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.request-details {
  flex-grow: 1;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.request-details p {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #4a5568;
}

.request-details svg {
  margin-right: 8px;
  color: #1a5f7a;
}

.request-details strong {
  font-weight: 600;
  color: #2d3748;
  margin-right: 5px;
}

.request-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.request-actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.request-actions button svg {
  margin-right: 5px;
}

.accept-button {
  background-color: #48bb78;
  color: white;
  margin-right: 10px;
}

.accept-button:hover {
  background-color: #38a169;
}

.reject-button {
  background-color: #f56565;
  color: white;
}

.reject-button:hover {
  background-color: #e53e3e;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
  border-radius: 10px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #1a5f7a;
  border-radius: 50%;
  border-top-color: #48bb78;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #718096;
}

.no-results svg {
  margin-bottom: 20px;
  color: #a0aec0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
  
  .sidebar.collapsed {
    width: 0;
    padding: 0;
  }
  
  .main-content {
    margin-left: 80px;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .actions {
    margin-top: 20px;
    width: 100%;
  }
  
  .search-bar {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .search-bar input {
    width: 100%;
  }
  
  .request-grid {
    grid-template-columns: 1fr;
  }
}
</style>