<template>
  <div class="dashboard" :class="{ 'sidebar-collapsed': isCollapsed }">
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
      <header class="main-header">
        <h2 class="page-title">User Management</h2>
        <div class="header-actions">
          <div class="search-container">
            <Search :size="20" class="search-icon" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Users..."
              class="search-input"
            />
          </div>
          <button class="action-button refresh-button" @click="refreshData">
            <RefreshCw :size="20" /> Refresh Data
          </button>
          <button class="action-button add-user-button" @click="showAddUserModal">
            <UserPlus :size="20" /> Add User
          </button>
        </div>
      </header>

      <div class="admin-panel">
        <div v-if="loading" class="loading-overlay">
          <Loader :size="40" class="spinner" />
          <p>Loading users...</p>
        </div>
        <div v-else-if="users.length === 0" class="empty-state">
          <Users :size="48" />
          <p>No users found. Add a new user to get started!</p>
        </div>
        <div v-else class="user-list">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" :class="{ 'highlight': user.id === editedUserId }">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <span :class="['category-badge', getCategoryClass(user.category)]">
                    {{ user.category || 'N/A' }}
                  </span>
                </td>
                <td>
                  <span :class="['status-badge', getStatusClass(user.status)]">
                    {{ user.status }}
                  </span>
                </td>
                <td>
                  <button @click="editUser(user)" class="action-button edit-btn" title="Edit User">
                    <Edit2 :size="16" />
                  </button>
                  <button @click="confirmDeleteUser(user)" class="action-button delete-btn" title="Delete User">
                    <Trash2 :size="16" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <transition name="fade">
          <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal">
              <h2 class="modal-title">{{ editMode ? 'Edit User' : 'Add New User' }}</h2>
              <form @submit.prevent="editMode ? updateUser() : addUser()">
                <div class="form-group">
                  <label for="username">Username:</label>
                  <input type="text" id="username" v-model="editedUserName" required>
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="editedUserEmail" required>
                </div>
                <div class="form-group" v-if="!editMode">
                  <label for="password">Password:</label>
                  <input type="password" id="password" v-model="editedUserPassword" required>
                </div>
                <div class="form-group">
                  <label for="role">Role:</label>
                  <select id="role" v-model="editedUserRole" required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="category">Category:</label>
                  <select id="category" v-model="editedUserCategory" required>
                    <option value="">Select Category</option>
                    <option value="PWD">Persons with Disabilities (PWD)</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="Solo Parent">Solo Parent</option>
                  </select>
                </div>
                <div class="form-actions">
                  <button type="submit" class="action-button save-btn" :disabled="isLoading">
                    <Check :size="16" /> {{ isLoading ? 'Processing...' : (editMode ? 'Update' : 'Add') + ' User' }}
                  </button>
                  <button type="button" @click="closeModal" class="action-button cancel-btn">
                    <X :size="16" /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showDeleteConfirmation" class="modal-overlay" @click.self="cancelDelete">
            <div class="modal delete-confirmation">
              <h2 class="modal-title">Confirm Deletion</h2>
              <p>Are you sure you want to delete this user?</p>
              <div class="form-actions">
                <button @click="deleteUser" class="action-button delete-btn">
                  <Trash2 :size="16" /> Delete
                </button>
                <button @click="cancelDelete" class="action-button cancel-btn">
                  <X :size="16" /> Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Users, Calendar, CreditCard, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, Search, RefreshCw, Edit2, Trash2, Check, X, UserPlus, Loader, HandshakeIcon } from 'lucide-vue-next'

const isCollapsed = ref(false)
const searchQuery = ref('')
const users = ref([])
const loading = ref(true)
const showModal = ref(false)
const editMode = ref(false)
const editedUserId = ref(null)
const editedUserName = ref('')
const editedUserEmail = ref('')
const editedUserPassword = ref('')
const editedUserRole = ref('')
const editedUserCategory = ref('')
const showDeleteConfirmation = ref(false)
const userToDelete = ref(null)
const isLoading = ref(false)

const navItems = [
  { name: 'Dashboard', route: '/Dashboard' },
  { name: 'Schedule', route: '/Schedule' },
  { name: 'Barangay Management', route: '/Barangaym'},
  { name: 'Assistance Management', route: '/AssistanceManagement'},
  { name: 'Card Management', route: '/CardManagement' },
  { name: 'User Management', route: '/user-management'},
]

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter((user) => {
    return (user.username && user.username.toLowerCase().includes(query)) ||
           (user.email && user.email.toLowerCase().includes(query))
  })
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const refreshData = async () => {
  loading.value = true
  await getUsers()
  loading.value = false
}

const getUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const showAddUserModal = () => {
  editMode.value = false
  resetEditedUser()
  showModal.value = true
}

const editUser = (user) => {
  editMode.value = true
  editedUserId.value = user.id
  editedUserName.value = user.username
  editedUserEmail.value = user.email
  editedUserPassword.value = ''
  editedUserRole.value = user.role
  editedUserCategory.value = user.category
  showModal.value = true
}

const addUser = async () => {
  isLoading.value = true
  const newUser = {
    username: editedUserName.value,
    email: editedUserEmail.value,
    password: editedUserPassword.value,
    role: editedUserRole.value,
    category: editedUserCategory.value,
  }

  try {
    const response = await axios.post('/api/register', newUser)
    users.value.push(response.data)
    closeModal()
  } catch (error) {
    console.error('Error adding user:', error)
  } finally {
    isLoading.value = false
  }
}

const updateUser = async () => {
  isLoading.value = true
  const data = {
    username: editedUserName.value,
    email: editedUserEmail.value,
    role: editedUserRole.value,
    category: editedUserCategory.value,
  }

  if (editedUserPassword.value) {
    data.password = editedUserPassword.value
  }

  try {
    const response = await axios.post(`/api/update_user/${editedUserId.value}`, data)
    console.log(response.data.msg)
    await getUsers()
    closeModal()
  } catch (error) {
    console.error('Error updating user:', error)
  } finally {
    isLoading.value = false
  }
}

const confirmDeleteUser = (user) => {
  userToDelete.value = user
  showDeleteConfirmation.value = true
}

const deleteUser = async () => {
  if (!userToDelete.value) return

  try {
    const response = await axios.delete(`/api/delete/${userToDelete.value.id}`)
    console.log(response.data.msg)
    await getUsers()
    cancelDelete()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const cancelDelete = () => {
  showDeleteConfirmation.value = false
  userToDelete.value = null
}

const closeModal = () => {
  showModal.value = false
  resetEditedUser()
}

const resetEditedUser = () => {
  editedUserId.value = null
  editedUserName.value = ''
  editedUserEmail.value = ''
  editedUserPassword.value = ''
  editedUserRole.value = ''
  editedUserCategory.value = ''
}

const getIcon = (name) => {
  switch (name) {
    case 'Dashboard': return BarChart2
    case 'Schedule': return Calendar
    case 'Barangay Management': return Users
    case 'Assistance Management': return HandshakeIcon
    case 'Card Management': return CreditCard
    case 'User Management': return Users
    case 'Settings': return Settings
    default: return null
  }
}

const getCategoryClass = (category) => {
  if (!category) return ''
  switch (category.toLowerCase()) {
    case 'pwd': return 'pwd'
    case 'senior citizen': return 'senior'
    case 'solo parent': return 'solo'
    default: return ''
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active': return 'active'
    case 'inactive': return 'inactive'
    default: return ''
  }
}

const logout = () => {
  console.log('Logging out...')
  // Implement logout logic here
}

onMounted(() => {
  getUsers()
})
</script>



<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar styles */
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
  padding: 20px;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.sidebar-collapsed .main-content {
  margin-left: 80px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
  margin-right: 15px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-input {
  padding: 10px 10px 10px 35px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  width: 250px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.action-button {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

.action-button:hover {
  background-color: #2c5282;
  transform: translateY(-2px);
}

.action-button:active {
  transform: translateY(0);
}

.action-button svg {
  margin-right: 5px;
}

.refresh-button {
  margin-right: 10px;
}

.admin-panel {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #a0aec0;
}

.empty-state svg {
  margin-bottom: 20px;
}

.user-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.user-table th,
.user-table td {
  padding: 15px;
  text-align: left;
}

.user-table th {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
}

.user-table tr {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.user-table tr:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-table tr.highlight {
  background-color: #ebf8ff;
}

.category-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.category-badge.pwd {
  background-color: #c6f6d5;
  color: #22543d;
}

.category-badge.senior {
  background-color: #feebc8;
  color: #9c4221;
}

.category-badge.solo {
  background-color: #e9d8fd;
  color: #553c9a;
}

.edit-btn,
.delete-btn {
  padding: 8px;
  margin-right: 5px;
}

.edit-btn {
  background-color: #4299e1;
}

.edit-btn:hover {
  background-color: #3182ce;
}

.delete-btn {
  background-color: #f56565;
}

.delete-btn:hover {
  background-color: #e53e3e;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #4a5568;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn {
  background-color: #48bb78;
}

.save-btn:hover {
  background-color: #38a169;
}

.cancel-btn {
  background-color: #e2e8f0;
  color: #4a5568;
}

.cancel-btn:hover {
  background-color: #cbd5e0;
}

.delete-confirmation {
  text-align: center;
}

.delete-confirmation p {
  margin-bottom: 20px;
  color: #4a5568;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }

  .sidebar-title,
  .user-name,
  .nav-link span,
  .logout-button span {
    display: none;
  }

  .main-content {
    margin-left: 80px;
  }

  .toggle-button {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    margin-top: 15px;
    flex-direction: column;
  }

  .search-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-input,
  .search-input:focus {
    width: 100%;
  }

  .action-button {
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }

  .user-table {
    font-size: 14px;
  }

  .user-table th,
  .user-table td {
    padding: 10px;
  }

  .edit-btn,
  .delete-btn {
    padding: 6px;
  }

  .category-badge {
    font-size: 10px;
    padding: 3px 6px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 10px;
  }

  .main-header {
    padding: 15px;
  }

  .page-title {
    font-size: 20px;
  }

  .user-table th,
  .user-table td {
    padding: 8px;
  }

  .modal {
    padding: 20px;
  }
}
</style>