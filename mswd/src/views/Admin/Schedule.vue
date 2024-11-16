<template>
  <div class="dashboard">
    <!-- Sidebar -->
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
        <span v-if="!isCollapsed" class="user-name">{{ currentUser.name }}</span>
        <button class="logout-button" @click="logout">
          <LogOut :size="20" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
      <button class="toggle-button" @click="toggleSidebar" :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <ChevronLeft v-if="!isCollapsed" :size="20" />
        <ChevronRight v-else :size="20" />
      </button>
    </aside>

    <!-- Main Content: Schedule Management -->
    <main class="main-content" :style="{ marginLeft: isCollapsed ? '80px' : '250px' }">
      <div class="schedule-container">
        <header class="content-header">
          <h1 class="page-title">Schedule Management</h1>
          <div class="header-actions">
            <button @click="toggleView" class="toggle-view-btn">
              <component :is="currentView === 'list' ? GridIcon : ListIcon" :size="20" />
              {{ currentView === 'list' ? 'Grid View' : 'List View' }}
            </button>
            <button @click="openModal()" class="add-schedule-btn">
              <PlusIcon :size="20" />
              Add New Schedule
            </button>
          </div>
        </header>

        <div class="filters">
          <div class="search-wrapper">
            <SearchIcon :size="20" class="search-icon" />
            <input v-model="searchQuery" placeholder="Search schedules..." class="search-input" />
          </div>
          <select v-model="filterDate" class="date-filter">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select v-model="filterStatus" class="status-filter">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
          <p>Loading schedules...</p>
        </div>

        <div v-else-if="filteredSchedules.length === 0" class="empty-state">
          <CalendarX :size="48" />
          <p>No schedules found. Click 'Add New Schedule' to create one.</p>
        </div>

        <div v-else :class="['schedule-list', { 'grid-view': currentView === 'grid' }]">
          <TransitionGroup name="list" tag="div">
            <div v-for="schedule in paginatedSchedules" :key="schedule.id" class="schedule-card">
              <div class="schedule-info">
                <div class="schedule-header">
                  <div class="schedule-date">{{ formatDate(schedule.date) }}</div>
                  <div v-if="schedule.status" class="schedule-status" :class="getStatusClass(schedule.status)">
                    {{ schedule.status }}
                  </div>
                </div>
                <h3 class="schedule-user">{{ schedule.user || 'Unknown User' }}</h3>
                <p class="schedule-description">{{ schedule.description || 'No description available' }}</p>
              </div>
              <div class="schedule-actions">
                <button @click="notifyUser(schedule)" class="action-btn notify-btn" :title="`Notify ${schedule.user || 'user'}`">
                  <BellIcon :size="16" />
                  Notify
                </button>
                <button @click="openModal(schedule)" class="action-btn edit-btn" :title="`Edit ${schedule.user || 'user'}'s schedule`">
                  <EditIcon :size="16" />
                  Edit
                </button>
                <button @click="deleteSchedule(schedule.id)" class="action-btn delete-btn" :title="`Delete ${schedule.user || 'user'}'s schedule`">
                  <TrashIcon :size="16" />
                  Delete
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
            <ChevronLeft :size="20" />
            Previous
          </button>
          <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
            Next
            <ChevronRight :size="20" />
          </button>
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
              <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" v-model="newSchedule.status" required>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
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

    <!-- Quick Actions Drawer -->
    <div class="quick-actions-drawer" :class="{ 'open': showQuickActions }">
      <button @click="toggleQuickActions" class="quick-actions-toggle">
        <component :is="showQuickActions ? XIcon : SettingsIcon" :size="24" />
      </button>
      <h3>Quick Actions</h3>
      <button @click="exportSchedules" class="quick-action-btn">
        <DownloadIcon :size="20" />
        Export Schedules
      </button>
      <button @click="importSchedules" class="quick-action-btn">
        <UploadIcon :size="20" />
        Import Schedules
      </button>
      <button @click="generateReport" class="quick-action-btn">
        <FileTextIcon :size="20" />
        Generate Report
      </button>
    </div>

    <!-- Notification Center -->
    <div class="notification-center" :class="{ 'open': showNotifications }">
      <button @click="toggleNotifications" class="notification-toggle">
        <BellIcon :size="24" />
        <span v-if="unreadNotifications > 0" class="notification-badge">{{ unreadNotifications }}</span>
      </button>
      <div v-if="showNotifications" class="notification-list">
        <h3>Notifications</h3>
        <div v-if="notifications.length === 0" class="empty-notifications">
          No new notifications
        </div>
        <div v-else v-for="notification in notifications" :key="notification.id" class="notification-item">
          <p>{{ notification.message }}</p>
          <small>{{ formatDate(notification.date) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Home, Calendar, HandsHelping, CreditCard, Users, ChevronLeft, ChevronRight, LogOut, PlusIcon, BellIcon, EditIcon, XIcon, CalendarX, TrashIcon, GridIcon, ListIcon, SettingsIcon, DownloadIcon, UploadIcon, FileTextIcon, SearchIcon } from 'lucide-vue-next';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isCollapsed = ref(false);
const showModal = ref(false);
const isLoading = ref(true);
const newSchedule = ref({ user: '', date: '', description: '', status: 'Pending' });
const schedules = ref([]);
const editingSchedule = ref(null);
const currentUser = ref({ name: 'Admin User' });
const searchQuery = ref('');
const filterDate = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const currentView = ref('list');
const showQuickActions = ref(false);
const showNotifications = ref(false);
const notifications = ref([]);
const unreadNotifications = ref(0);

const navItems = [
  { name: 'Dashboard', route: '/Dashboard', icon: Home },
  { name: 'Schedule', route: '/Schedule', icon: Calendar },
  { name: 'Barangay Management', route: '/Barangaym', icon: Users },
  { name: 'Assistance Management', route: '/AssistanceManagement', icon: HandsHelping },
  { name: 'Card Management', route: '/CardManagement', icon: CreditCard },
  { name: 'User Management', route: '/user-management', icon: Users },
];

const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('sidebarCollapsed', isCollapsed.value);
};

const fetchSchedules = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('/api/schedules');
    schedules.value = response.data.map(schedule => ({
      ...schedule,
      user: schedule.user || 'Unknown User',
      description: schedule.description || 'No description available',
      status: schedule.status || 'Pending'
    }));
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
    newSchedule.value = { user: '', date: '', description: '', status: 'Pending' };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingSchedule.value = null;
  newSchedule.value = { user: '', date: '', description: '', status: 'Pending' };
};

const addOrUpdateSchedule = async () => {
  try {
    if (editingSchedule.value) {
      await axios.post(`/api/editschedules/${editingSchedule.value.id}`, newSchedule.value);
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
  if (!date) return 'No date specified';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getStatusClass = (status) => {
  if (!status) return 'unknown';
  return status.toLowerCase();
};

const logout = () => {
  // TODO: Implement logout logic
  router.push('/login');
};

const toggleView = () => {
  currentView.value = currentView.value === 'list' ? 'grid' : 'list';
};

const filteredSchedules = computed(() => {
  let filtered = schedules.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(schedule => 
      schedule.user.toLowerCase().includes(query) ||
      schedule.description.toLowerCase().includes(query)
    );
  }

  if (filterDate.value) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    filtered = filtered.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      switch (filterDate.value) {
        case 'today':
          return scheduleDate.toDateString() === today.toDateString();
        case 'week':
          const weekStart = new Date(today);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          return scheduleDate >= weekStart && scheduleDate <= weekEnd;
        case 'month':
          return scheduleDate.getMonth() === today.getMonth() && scheduleDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  }

  if (filterStatus.value) {
    filtered = filtered.filter(schedule => schedule.status === filterStatus.value);
  }

  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredSchedules.value.length / itemsPerPage));

const paginatedSchedules = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSchedules.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const toggleQuickActions = () => {
  showQuickActions.value = !showQuickActions.value;
};

const exportSchedules = async () => {
  try {
    const response = await axios.get('/api/export-schedules', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schedules.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error exporting schedules:', error);
    // TODO: Add error handling, e.g., show an error message to the user
  }
};

const importSchedules = () => {
  // TODO: Implement import functionality
  console.log('Import schedules functionality to be implemented');
};

const generateReport = async () => {
  try {
    const response = await axios.get('/api/generate-report', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schedule_report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error generating report:', error);
    // TODO: Add error handling, e.g., show an error message to the user
  }
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    unreadNotifications.value = 0;
  }
};

const fetchNotifications = async () => {
  try {
    const response = await axios.get('/api/notifications');
    notifications.value = response.data;
    unreadNotifications.value = notifications.value.filter(n => !n.read).length;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    // TODO: Add error handling, e.g., show an error message to the user
  }
};

watch(filteredSchedules, () => {
  currentPage.value = 1;
});

onMounted(() => {
  fetchSchedules();
  fetchNotifications();
  
  // Restore sidebar state from localStorage
  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState !== null) {
    isCollapsed.value = JSON.parse(savedState);
  }
});
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
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  height: 50px;
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

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.schedule-date {
  font-size: 0.9rem;
  color: #666;
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
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

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-wrapper {
  position: relative;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.date-filter,
.status-filter {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.toggle-view-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.toggle-view-btn:hover {
  background-color: #e0e0e0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.schedule-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.schedule-status.pending {
  background-color: #FFF9C4;
  color: #FBC02D;
}

.schedule-status.confirmed {
  background-color: #C8E6C9;
  color: #4CAF50;
}

.schedule-status.cancelled {
  background-color: #FFCDD2;
  color: #F44336;
}

.schedule-status.unknown {
  background-color: #E0E0E0;
  color: #757575;
}

.quick-actions-drawer {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  padding: 20px;
}

.quick-actions-drawer.open {
  right: 0;
}

.quick-actions-toggle {
  position: absolute;
  top: 20px;
  left: -40px;
  background-color: white;
  border: none;
  border-radius: 50% 0 0 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quick-action-btn:hover {
  background-color: #e0e0e0;
}

.notification-center {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification-toggle {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.notification-list {
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}

.empty-notifications {
  text-align: center;
  color: #666;
  padding: 20px 0;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Responsive adjustments */
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
    padding: 20px;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 20px;
  }

  .schedule-list {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>