<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/placeholder.svg?height=50&width=50" alt="MSWD Logo" class="logo">
        <h1 class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
          <a href="#" class="nav-link" :class="{ active: activeSection === 'dashboard' }" @click="setActiveSection('dashboard')">
            <i class="fas fa-chart-line"></i> <span>Dashboard</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeSection === 'requests' }" @click="setActiveSection('requests')">
            <i class="fas fa-hands-helping"></i> <span>Assistance Requests</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-users"></i> <span>Users</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-file-alt"></i> <span>Reports</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-cog"></i> <span>Settings</span>
          </a>
      </nav>
      <div class="user-info">
        <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" class="user-avatar">
        <span class="user-name">Admin User</span>
        <button class="logout-button">
          <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
      </div>
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
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeSection: 'requests',
      requestHistory: [],
      isLoading: false,
    };
  },
  mounted() {
    this.fetchRequestHistory();
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    fetchRequestHistory() {
      this.isLoading = true;
      axios
        .get('/api/PWD')
        .then((response) => {
          this.requestHistory = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    acceptRequest(request) {
      axios
        .post('/api/acceptRequest', { requestId: request.id })
        .then((response) => {
          console.log('Request accepted:', response.data);
          const index = this.requestHistory.indexOf(request);
          if (index !== -1) {
            this.requestHistory.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error('Error accepting request:', error);
        });
    },
    rejectRequest(request) {
      axios
        .post('/api/rejectRequest', { requestId: request.id })
        .then((response) => {
          console.log('Request rejected:', response.data);
          const index = this.requestHistory.indexOf(request);
          if (index !== -1) {
            this.requestHistory.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error('Error rejecting request:', error);
        });
    },
  },
};
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
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
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

.logout-button i {
  margin-right: 5px;
}

.main-content {
  flex-grow: 1;
  margin-left: 250px;
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

@media (max-width: 992px) {
  .sidebar {
    width: 80px;
  }

  .sidebar-title, .user-name, .nav-link span, .logout-button span {
    display: none;
  }

  .main-content {
    margin-left: 80px;
  }

  .user-info {
    align-items: center;
  }

  .logout-button {
    padding: 8px;
  }

  .logout-button i {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    padding: 10px;
  }

  .sidebar-nav {
    display: none;
  }

  .user-info {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }

  .container {
    padding: 10px;
  }

  .request-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .request-image {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>