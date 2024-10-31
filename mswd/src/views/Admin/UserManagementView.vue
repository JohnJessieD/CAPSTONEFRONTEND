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
        <button class="logout-button" @click="logout">
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
          <button class="refresh-button" @click="refreshData">
            <RefreshCw :size="20" /> Refresh Data
          </button>
        </div>
      </header>

      <div class="admin-panel">
        <div class="user-list">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.category }}</td>
                <td>
                  <button @click="editUser(user)" class="edit-btn">
                    <Edit2 :size="16" /> Edit
                  </button>
                  <button @click="deleteUser(user)" class="delete-btn">
                    <Trash2 :size="16" /> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="editMode" class="user-form-modal">
          <div class="user-form">
            <h2 class="form-title">Edit User</h2>
            <form @submit.prevent="updateUser">
              <div class="form-group">
                <label for="name" class="form-label">Name:</label>
                <input type="text" id="name" v-model="editedUserName" class="form-input">
              </div>
              <div class="form-group">
                <label for="role" class="form-label">Role:</label>
                <input type="text" id="role" v-model="editedUserRole" class="form-input">
              </div>
              <div class="form-group">
                <label for="category" class="form-label">Category:</label>
                <select id="category" v-model="editedUserCategory" class="form-select">
                  <option value="">Select Category</option>
                  <option value="PWD">Persons with Disabilities (PWD)</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                  <option value="Solo Parent">Solo Parent</option>
                </select>
              </div>
              <button type="submit" class="update-btn">
                <Check :size="16" /> Update User
              </button>
              <button type="button" @click="cancelEdit" class="cancel-btn">
                <X :size="16" /> Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Users, Calendar, HandsHelping, CreditCard, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, Search, RefreshCw, Edit2, Trash2, Check, X } from 'lucide-vue-next'

const isCollapsed = ref(false)
const searchQuery = ref('')
const users = ref([])
const editMode = ref(false)
const editedUserId = ref(null)
const editedUserName = ref('')
const editedUserRole = ref('')
const editedUserCategory = ref('')

const navItems = [
{ name: 'Dashboard', route: '/Dashboard' },
        { name: 'Schedule', route: '/Schedule' },
        { name: 'Barangay Management', route: '/Barangaym'},
        { name: 'Assistance Management', route: '/AssistanceManagement'},
        { name: 'Card Management', route: '/CardManagement' },
        { name: 'User Management', route: '/user-management'},
]

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const refreshData = () => {
  getUsers()
}

const getUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const editUser = (user) => {
  editMode.value = true
  editedUserId.value = user.id
  editedUserName.value = user.username
  editedUserRole.value = user.role
  editedUserCategory.value = user.category
}

const updateUser = async () => {
  const data = {
    username: editedUserName.value,
    role: editedUserRole.value,
    category: editedUserCategory.value,
  }

  try {
    const response = await axios.post(`/api/update_user/${editedUserId.value}`, data)
    console.log(response.data.msg)
    await getUsers()
    editMode.value = false
    resetEditedUser()
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

const deleteUser = async (user) => {
  try {
    const response = await axios.delete(`/api/delete/${user.id}`)
    console.log(response.data.msg)
    await getUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const cancelEdit = () => {
  editMode.value = false
  resetEditedUser()
}

const resetEditedUser = () => {
  editedUserId.value = null
  editedUserName.value = ''
  editedUserRole.value = ''
  editedUserCategory.value = ''
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
  padding: 20px;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed + .main-content {
  margin-left: 80px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
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
  color: #757575;
}

.search-input {
  padding: 8px 8px 8px 35px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 200px;
  transition: all 0.3s ease;
}

.search-input:focus {
  width: 250px;
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.refresh-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.refresh-button:hover {
  background-color: #45a049;
}

.refresh-button svg {
  margin-right: 5px;
}

.admin-panel {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background-color: #050606;
  color: #ffffff;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.edit-btn,
.delete-btn,
.update-btn,
.cancel-btn {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
}

.edit-btn,
.update-btn {
  background-color: #28a745;
  color: #ffffff;
}

.delete-btn,
.cancel-btn {
  background-color: #dc3545;
  color: #ffffff;
}

.edit-btn:hover,
.update-btn:hover,
.delete-btn:hover,
.cancel-btn:hover {
  opacity: 0.8;
}

.edit-btn svg,
.delete-btn svg,
.update-btn svg,
.cancel-btn svg {
  margin-right: 5px;
}

.user-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-form {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-title {
  font-size: 20px;
  color: #333333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
  display: block;
}

.form-input,
.form-select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
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

  .logout-button svg {
    margin-right: 0;
  }

  .toggle-button {
    display: none;
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

  .main-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 10px;
    width: 100%;
  }

  .search-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-input, .search-input:focus {
    width: 100%;
  }

  .refresh-button {
    width: 100%;
    justify-content: center;
  }
}
</style>