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
      <button class="toggle-button" @click="toggleSidebar">
        <ChevronLeft v-if="!isCollapsed" :size="20" />
        <ChevronRight v-else :size="20" />
      </button>
    </aside>

    <!-- Main Content: Schedule Management -->
    <main class="main-content" :style="{ marginLeft: isCollapsed ? '80px' : '250px' }">
      <div class="schedule-container">
        <header class="content-header">
          <h1 class="page-title">Schedule Management</h1>
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
          <div v-for="schedule in schedules" :key="schedule.id" class="schedule-card">
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
              <button @click="openModal(schedule)" class="action-btn edit-btn" :title="`Edit ${schedule.user}'s schedule`">
                <EditIcon :size="16" />
                Edit
              </button>
              <button @click="deleteSchedule(schedule.id)" class="action-btn delete-btn" :title="`Delete ${schedule.user}'s schedule`">
                <TrashIcon :size="16" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <button class="close-btn" @click="closeModal">
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
                <button type="button" @click="closeModal" class="modal-btn cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut, PlusIcon, BellIcon, EditIcon, XIcon, CalendarX, TrashIcon } from 'lucide-vue-next';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut, PlusIcon, BellIcon, EditIcon, XIcon, CalendarX, TrashIcon
  },
  setup() {
    const isCollapsed = ref(false);
    const showModal = ref(false);
    const isLoading = ref(true);
    const newSchedule = ref({ user: '', date: '', description: '' });
    const schedules = ref([]);
    const editingSchedule = ref(null);

    const navItems = [
      { name: 'Dashboard', route: '/Dashboard', icon: Home },
      { name: 'Schedule', route: '/Schedule', icon: Calendar },
      { name: 'Barangay Management', route: '/Barangaym', icon: HandsHelping },
      { name: 'Assistance Management', route: '/AssistanceManagement', icon: CreditCard },
      { name: 'User Management', route: '/user-management', icon: Users },
    ];

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const fetchSchedules = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get('/api/schedules');
        schedules.value = response.data;
      } catch (error) {
        console.error('Error fetching schedules:', error);
        // TODO: Add error handling, e.g., show an error message to the user
      } finally {
        isLoading.value = false;
      }
    };

    const openModal = (schedule = null) => {
      if (schedule) {
        editingSchedule.value = schedule;
        newSchedule.value = { ...schedule };
      } else {
        editingSchedule.value = null;
        newSchedule.value = { user: '', date: '', description: '' };
      }
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      editingSchedule.value = null;
      newSchedule.value = { user: '', date: '', description: '' };
    };

    const addOrUpdateSchedule = async () => {
      try {
        if (editingSchedule.value) {
          await axios.put(`/api/editschedules/${editingSchedule.value.id}`, newSchedule.value);
        } else {
          await axios.post('/api/Createschedules', newSchedule.value);
        }
        await fetchSchedules();
        closeModal();
      } catch (error) {
        console.error('Error saving schedule:', error);
        // TODO: Add error handling, e.g., show an error message to the user
      }
    };

    const deleteSchedule = async (id) => {
      if (confirm('Are you sure you want to delete this schedule?')) {
        try {
          await axios.delete(`/api/deleteschedules/${id}`);
          await fetchSchedules();
        } catch (error) {
          console.error('Error deleting schedule:', error);
          // TODO: Add error handling, e.g., show an error message to the user
        }
      }
    };

    const notifyUser = async (schedule) => {
      try {
        await axios.post(`/api/schedules/${schedule.id}/notify`);
        console.log('User notified about schedule:', schedule);
        // TODO: Add success message to the user
      } catch (error) {
        console.error('Error notifying user:', error);
        // TODO: Add error handling, e.g., show an error message to the user
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Function to push PWD to schedule after accepting request or assistance
    const pushPWDToSchedule = async (pwdId, assistanceId) => {
      try {
        const response = await axios.post('/api/push-pwd-to-schedule', { pwdId, assistanceId });
        console.log('PWD pushed to schedule:', response.data);
        await fetchSchedules(); // Refresh schedules after pushing
        // TODO: Add success message to the user
      } catch (error) {
        console.error('Error pushing PWD to schedule:', error);
        // TODO: Add error handling, e.g., show an error message to the user
      }
    };

    onMounted(fetchSchedules);

    return {
      isCollapsed,
      navItems,
      toggleSidebar,
      schedules,
      newSchedule,
      addOrUpdateSchedule,
      deleteSchedule,
      notifyUser,
      formatDate,
      showModal,
      openModal,
      closeModal,
      isLoading,
      editingSchedule,
      pushPWDToSchedule
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

/* Main content styles */
.main-content {
  margin-left: 250px;
  padding: 40px;
  transition: margin-left 0.3s ease;
  background-color: #f8f9fa;
}

.schedule-container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.add-schedule-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-schedule-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4CAF50;
  border-radius: 50%;
  width: 50px;
  height:  50px;
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
  height: 300px;
  color: #666;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 40px;
}

.empty-state svg {
  margin-bottom: 20px;
  color: #4CAF50;
}

.schedule-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.schedule-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.schedule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.schedule-info {
  padding: 24px;
}

.schedule-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
}

.schedule-user {
  font-size: 1.4rem;
  margin: 0 0 12px;
  color: #333;
}

.schedule-description {
  color: #555;
  line-height: 1.5;
}

.schedule-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
}

.notify-btn {
  color: #4CAF50;
}

.edit-btn {
  color: #2196F3;
}

.delete-btn {
  color: #f44336;
}

.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
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
  z-index: 1000;
}

.modal {
  position: relative;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

.modal h3 {
  font-size: 1.8rem;
  margin-bottom: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group textarea {
  height: 120px;
  resize: vertical;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
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

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 20px;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-schedule-btn {
    margin-top: 20px;
    width: 100%;
    justify-content: center;
  }

  .schedule-list {
    grid-template-columns: 1fr;
  }

  .modal {
    padding: 30px;
  }
}
</style>