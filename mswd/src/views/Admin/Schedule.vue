<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="/placeholder.svg?height=50&width=50" alt="MSWD Logo" class="logo">
        <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
        <router-link v-for="(item, index) in navItems" :key="index" :to="item.route" class="nav-link">
          <component :is="item.icon" :size="24" />
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </router-link>
      </nav>
      <div class="user-info">
        <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" class="user-avatar">
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

    <!-- Enhanced Main Content: Schedule Management -->
    <main class="main-content" :style="{ marginLeft: isCollapsed ? '80px' : '250px' }">
      <div class="schedule-container">
        <header class="content-header">
          <h1>Schedule Management</h1>
          <button @click="openModal()" class="add-schedule-btn">
            <PlusIcon :size="20" />
            Add New Schedule
          </button>
        </header>

        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
          <p>Loading schedules...</p>
        </div>

        <div v-else-if="schedules.length === 0" class="empty-state">
          <CalendarX :size="48" />
          <p>No schedules found. Click 'Add New Schedule' to create one.</p>
        </div>

        <div v-else class="schedule-list">
          <div v-for="(schedule, index) in schedules" :key="index" class="schedule-card">
            <div class="schedule-info">
              <div class="schedule-date">{{ formatDate(schedule.date) }}</div>
              <h3 class="schedule-user">{{ schedule.user }}</h3>
              <p class="schedule-description">{{ schedule.description }}</p>
            </div>
            <div class="schedule-actions">
              <button @click="notifyUser(schedule)" class="action-btn notify-btn" :title="`Notify ${schedule.user}`">
                <BellIcon :size="16" />
                Notify
              </button>
              <button @click="openModal(schedule.user)" class="action-btn edit-btn" :title="`Edit ${schedule.user}'s schedule`">
                <EditIcon :size="16" />
                Edit
              </button>
            </div>
          </div>
        </div>

        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <button class="close-btn" @click="showModal = false">
              <XIcon :size="24" />
            </button>
            <h3>{{ editingSchedule ? 'Edit Schedule' : 'Add New Schedule' }}</h3>
            <form @submit.prevent="addOrUpdateSchedule">
              <div class="form-group">
                <label for="user">User:</label>
                <input type="text" id="user" v-model="newSchedule.user" required>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" v-model="newSchedule.date" required>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="newSchedule.description" required></textarea>
              </div>
              <div class="modal-buttons">
                <button type="submit" class="modal-btn submit-btn">
                  {{ editingSchedule ? 'Update' : 'Submit' }}
                </button>
                <button type="button" @click="showModal = false" class="modal-btn cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut, PlusIcon, BellIcon, EditIcon, XIcon, CalendarX } from 'lucide-vue-next';

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut, PlusIcon, BellIcon, EditIcon, XIcon, CalendarX
  },
  setup() {
    const isCollapsed = ref(false);
    const showModal = ref(false);
    const isLoading = ref(false);
    const newSchedule = ref({ user: '', date: '', description: '' });
    const schedules = ref([
      { user: "John Doe", date: "2024-05-01", description: "Annual performance review meeting" },
      { user: "Jane Smith", date: "2024-05-02", description: "Team building workshop" },
      { user: "Mike Johnson", date: "2024-05-03", description: "Project kickoff presentation" },
      { user: "Emily Brown", date: "2024-05-04", description: "Client consultation" },
      { user: "Alex Wilson", date: "2024-05-05", description: "Budget planning session" },
      { user: "Sarah Davis", date: "2024-05-06", description: "Department heads meeting" },
      { user: "Chris Taylor", date: "2024-05-07", description: "Employee orientation" },
      { user: "Lisa Anderson", date: "2024-05-08", description: "Quarterly review" }
    ]);

    const navItems = [
      { name: 'Dashboard', route: '/Dashboard' },
      { name: 'Schedule', route: '/Schedule' },
      { name: 'Barangay Management', route: '/Barangaym' },
      { name: 'Assistance Management', route: '/AssistanceManagement' },
      { name: 'Card Management', route: '/CardManagement'},
      { name: 'User Management', route: '/user-management' },
    ];

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const editingSchedule = ref(null);

    const openModal = (user = '') => {
      if (user) {
        editingSchedule.value = schedules.value.find(s => s.user === user);
        newSchedule.value = { ...editingSchedule.value };
      } else {
        editingSchedule.value = null;
        newSchedule.value = { user: '', date: '', description: '' };
      }
      showModal.value = true;
    };

    const addOrUpdateSchedule = () => {
      if (editingSchedule.value) {
        const index = schedules.value.findIndex(s => s.user === editingSchedule.value.user);
        schedules.value[index] = { ...newSchedule.value };
      } else {
        schedules.value.push({ ...newSchedule.value });
      }
      showModal.value = false;
    };

    const notifyUser = (schedule) => {
      console.log('Notifying user about schedule:', schedule);
      // Implement actual notification logic here
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return {
      isCollapsed,
      navItems,
      toggleSidebar,
      schedules,
      newSchedule,
      addOrUpdateSchedule,
      notifyUser,
      formatDate,
      showModal,
      openModal,
      isLoading,
      editingSchedule
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

/* Main content styles */
.main-content {
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.schedule-container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-schedule-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-schedule-btn:hover {
  background-color: #45a049;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
}

.schedule-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.schedule-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.schedule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.schedule-info {
  padding: 20px;
}

.schedule-date {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.schedule-user {
  font-size: 1.2em;
  margin: 0 0 10px;
}

.schedule-description {
  color: #333;
}

.schedule-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f5f5f5;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.notify-btn {
  color: #4CAF50;
}

.edit-btn {
  color: #2196F3;
}

.action-btn:hover {
  opacity: 0.8;
}

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
}

.modal {
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.submit-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}
</style>