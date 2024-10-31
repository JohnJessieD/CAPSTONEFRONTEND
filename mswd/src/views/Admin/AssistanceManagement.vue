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
      <div class="spacer"></div>
      <div class="container">
        <div class="content">
          <h2>Assistance Requests</h2>
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
                    <strong>Created At:</strong> {{ request.created_at }}
                  </p>
                  <div class="action-buttons">
                    <button @click="acceptRequest(request)">Accept</button>
                    <button @click="rejectRequest(request)">Reject</button>
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
import { ref, onMounted } from 'vue'
import { Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight
  },
  setup() {
    const isCollapsed = ref(false)
    const requestHistory = ref([])
    const isLoading = ref(false)

    const navItems = [
    { name: 'Dashboard', route: '/Dashboard' },
        { name: 'Schedule', route: '/Schedule' },
        { name: 'Barangay Management', route: '/Barangaym'},
        { name: 'Assistance Management', route: '/AssistanceManagement'},
        { name: 'Card Management', route: '/CardManagement' },
        { name: 'User Management', route: '/user-management'},
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
      } catch (error) {
        console.error('Error rejecting request:', error)
      }
    }

    onMounted(() => {
      fetchRequestHistory()
    })

    return {
      isCollapsed,
      navItems,
      toggleSidebar,
      requestHistory,
      isLoading,
      acceptRequest,
      rejectRequest
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

.logo {
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

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
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
  margin-left: 250px; /* Adjusted margin to accommodate sidebar */
  padding: 20px; /* Added padding for main content */
  transition: margin-left 0.3s ease; /* Smooth transition for sidebar */
}

.sidebar.collapsed + .main-content {
  margin-left: 80px; /* Adjusted margin when sidebar is collapsed */
}

.spacer {
  height: 100px;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
}

.content {
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.request-card {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
}

.request-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.request-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.request-details {
  flex-grow: 1;
  font-family: sans-serif;
  line-height: 1.5;
}

.request-details strong {
  font-weight: bold;
}

.action-buttons {
  margin-top: 10px;
}

.action-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.action-buttons button:hover {
  background-color: #f0f0f0;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
