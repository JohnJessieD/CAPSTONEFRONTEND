<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
        <router-link v-for="(item, index) in navItems" :key="index" :to="item.route" class="nav-link">
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
    
    <main class="main-content">
      <div class="top-bar">
        <h2>Assistance Requests</h2>
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
      <div class="container">
        <div class="content">
          <div v-if="isLoading">
            <div class="loading-overlay">
              <div class="spinner"></div>
              <p>Loading...</p>
            </div>
          </div>
          <div v-else>
            <div v-for="(request, index) in requestHistory" :key="index">
              <div class="request-card">
                <img :src="request.image" alt="Request Image" class="request-image" />
                <div class="request-details">
                  <p>
                    <strong>Amount:</strong> {{ request.amount }}
                  </p>
                  <p>
                    <strong>Reason:</strong> {{ request.reason }}
                  </p>
                  <p>
                    <strong>Created At:</strong> {{ formatTime(request.created_at) }}
                  </p>
                  <div class="action-buttons">
                    <button @click="acceptRequest(request)" class="accept-button">Accept</button>
                    <button @click="rejectRequest(request)" class="reject-button">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight, Bell, Check, AlertCircle, UserPlus } from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight, Bell, Check, AlertCircle, UserPlus
  },
  setup() {
    const isCollapsed = ref(false)
    const requestHistory = ref([])
    const isLoading = ref(false)
    const notifications = ref([])
    const showNotifications = ref(false)

    const navItems = [
      { name: 'Dashboard', route: '/Dashboard', icon: Home },
      { name: 'Schedule', route: '/Schedule', icon: Calendar },
      { name: 'Barangay Management', route: '/Barangaym', icon: Users },
      { name: 'Assistance Management', route: '/AssistanceManagement', icon: HandsHelping },
      { name: 'Card Management', route: '/CardManagement', icon: CreditCard },
      { name: 'User Management', route: '/user-management', icon: Users },
    ]

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const fetchRequestHistory = async () => {
      isLoading.value = true
      try {
        const response = await axios.get('/api/PWD')
        requestHistory.value = response.data
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const acceptRequest = async (request) => {
      try {
        const response = await axios.post('/api/acceptRequest', { requestId: request.id })
        console.log('Request accepted:', response.data)
        const index = requestHistory.value.indexOf(request)
        if (index !== -1) {
          requestHistory.value.splice(index, 1)
        }
        await fetchNotifications()
      } catch (error) {
        console.error('Error accepting request:', error)
      }
    }

    const rejectRequest = async (request) => {
      try {
        const response = await axios.post('/api/rejectRequest', { requestId: request.id })
        console.log('Request rejected:', response.data)
        const index = requestHistory.value.indexOf(request)
        if (index !== -1) {
          requestHistory.value.splice(index, 1)
        }
        await fetchNotifications()
      } catch (error) {
        console.error('Error rejecting request:', error)
      }
    }

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

    onMounted(() => {
      fetchRequestHistory()
      fetchNotifications()
    })

    return {
      isCollapsed,
      navItems,
      toggleSidebar,
      requestHistory,
      isLoading,
      acceptRequest,
      rejectRequest,
      notifications,
      showNotifications,
      toggleNotifications,
      markAsRead,
      markAllAsRead,
      unreadCount,
      getNotificationIcon,
      formatTime
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
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

.sidebar.collapsed + .main-content {
  margin-left: 80px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  background-color: #ff4757;
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
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 350px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
}

.notifications-panel h3 {
  padding: 15px;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  font-size: 18px;
  color: #333;
}

.notifications-list {
  padding: 10px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border-bottom: 1px solid #e1e1e1;
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #e8f5e9;
}

.notification-icon {
  margin-right: 12px;
  color: #4CAF50;
}

.notification-content {
  flex-grow: 1;
}

.notification-message {
  margin: 0 0 5px;
  font-size: 14px;
  color: #333;
}

.notification-time {
  margin: 0;
  font-size: 12px;
  color: #777;
}

.mark-read-button {
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  padding: 4px;
  margin-left:  8px;
}

.mark-all-read-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.mark-all-read-button:hover {
  background-color: #45a049;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
}

.content {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.request-card {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
}

.request-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.request-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.request-details {
  flex-grow: 1;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

.request-details strong {
  font-weight: bold;
  color: #333;
}

.action-buttons {
  margin-top: 15px;
}

.action-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.accept-button {
  background-color: #4CAF50;
  color: white;
}

.accept-button:hover {
  background-color: #45a049;
}

.reject-button {
  background-color: #ff4757;
  color: white;
}

.reject-button:hover {
  background-color: #e04146;
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
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #4CAF50;
  border-radius: 50%;
  border-top-color: #45a049;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>