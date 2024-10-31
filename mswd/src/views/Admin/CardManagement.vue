<template>
  <div class="dashboard">
    <!-- Sidebar -->
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
    </aside>

    <!-- Main Content: Schedule and User Management -->
    <main class="main-content" :style="{ marginLeft: isCollapsed ? '80px' : '250px' }">
      <!-- Spacer between navigation and content -->
      <div class="spacer"></div>

      <!-- User Card Management -->
      <div>
        <h2>User Card Management</h2>

        <!-- Loading spinner -->
        <div v-if="isLoading">
          <div class="loading-overlay">
            <div class="spinner"></div>
            <p>Loading user data...</p>
          </div>
        </div>

        <!-- User Cards Display -->
        <div v-else class="user-cards">
          <div v-for="(user, index) in users" :key="index" class="user-card">
            <h3>{{ user.username }}</h3>
            <p v-if="user.requirements">Requirements: {{ user.requirements }}</p>
            <p>Category: {{ user.category }}</p>
            <p v-if="user.certificate">Certificate: {{ user.certificate }}</p>
            <button @click="printUser(user)">Print User Card</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut } from 'lucide-vue-next';
import axios from 'axios'; // Assuming you're fetching user data from an API

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut
  },
  setup() {
    const isCollapsed = ref(false);
    const isLoading = ref(true); // Loading state for the user data
    const users = ref([]);

    const navItems = [
    { name: 'Dashboard', route: '/Dashboard' },
        { name: 'Schedule', route: '/Schedule' },
        { name: 'Barangay Management', route: '/Barangaym'},
        { name: 'Assistance Management', route: '/AssistanceManagement'},
        { name: 'Card Management', route: '/CardManagement' },
        { name: 'User Management', route: '/user-management'},
    ];

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the API endpoint
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        isLoading.value = false; // Set loading to false after fetching or on error
      }
    };

    const printUser = (user) => {
      const userCard = `
        Username: ${user.username}
        ${user.requirements ? 'Requirements: ' + user.requirements : ''}
        Date of Birth: ${user.dob}
        Category: ${user.category}
        ${user.certificate ? 'Certificate: ' + user.certificate : ''}
      `;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(userCard);
      printWindow.document.close();
      printWindow.print();
    };

    fetchUsers();

    return {
      isCollapsed,
      navItems,
      toggleSidebar,
      isLoading,
      users,
      fetchUsers,
      printUser,
    };
  }
};
</script>

<style scoped>
/* Sidebar styles */
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
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: #45a049;
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


.toggle-button svg {
  margin: 0;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.spacer {
  height: 100px; /* Adjust the height for desired spacing */
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

.user-cards {
  display: flex;
  flex-direction: column;
}

.user-card {
  border: 1px solid #000;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin-top: 0;
}

.user-card p {
  margin: 10px 0;
}

@media print {
  /* Hide AdminNav and loading overlay during printing */
  .AdminNav,
  .loading-overlay {
    display: none;
  }
}
</style>
