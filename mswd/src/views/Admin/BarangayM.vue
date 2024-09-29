<template>
    <div class="dashboard">
      <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
        <div class="sidebar-header">
          <img src="/placeholder.svg?height=50&width=50" alt="MSWD Logo" class="logo">
          <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
        </div>
        <nav class="sidebar-nav">
          <a v-for="(item, index) in navItems" :key="index" :href="item.route" class="nav-link">
            <component :is="item.icon" :size="24" />
            <span v-if="!isCollapsed">{{ item.name }}</span>
          </a>
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
  
      <main class="main-content" :class="{ 'collapsed': isCollapsed }">
        <div class="content-wrapper">
          <header class="main-header">
            <h1 class="page-title">{{ currentCategoryTitle }} Management</h1>
            <div class="header-actions">
              <select v-model="currentCategory" class="category-select">
                <option value="pwd">PWD</option>
                <option value="soloParent">Solo Parent</option>
                <option value="senior">Senior Citizen</option>
              </select>
              <button class="add-barangay-btn" @click="openAddBarangayModal">Add Barangay</button>
            </div>
          </header>
  
          <div class="table-container">
            <table class="barangay-table">
              <thead>
                <tr>
                  <th>Barangay Name</th>
                  <th>Total {{ currentCategoryTitle }}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="barangay in filteredBarangays" :key="barangay.id">
                  <td>{{ barangay.name }}</td>
                  <td>{{ barangay.stats[currentCategory].value }}</td>
                  <td>
                    <button @click="editBarangay(barangay)" class="action-btn edit-btn">
                      <Edit :size="16" />
                    </button>
                    <button @click="deleteBarangay(barangay.id)" class="action-btn delete-btn">
                      <Trash2 :size="16" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <div v-if="isModalOpen" class="modal">
          <div class="modal-content">
            <h2>{{ isEditing ? 'Edit Barangay' : 'Add Barangay' }}</h2>
            <input v-model="barangayForm.name" placeholder="Barangay Name" />
            <input v-model.number="barangayForm.stats[currentCategory].value" type="number" :placeholder="'Total ' + currentCategoryTitle" />
            <div class="modal-actions">
              <button @click="closeModal" class="cancel-btn">Cancel</button>
              <button @click="saveBarangay" class="save-btn">{{ isEditing ? 'Update' : 'Add' }}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import { Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-vue-next'
  
  export default {
    name: 'Dashboard',
    components: {
      Home,
      Calendar,
      HandsHelping,
      CreditCard,
      Users,
      LogOut,
      ChevronLeft,
      ChevronRight,
      Edit,
      Trash2
    },
    setup() {
      const isCollapsed = ref(false)
      const currentCategory = ref('pwd')
      const isModalOpen = ref(false)
      const isEditing = ref(false)
      const barangayForm = ref({ name: '', stats: { pwd: { value: 0 }, soloParent: { value: 0 }, senior: { value: 0 } } })
      const barangays = ref([
        { id: 1, name: 'Barangay Ilag', stats: { pwd: { value: 5 }, soloParent: { value: 10 }, senior: { value: 20 } } },
        { id: 2, name: 'Barangay Poblacion', stats: { pwd: { value: 3 }, soloParent: { value: 8 }, senior: { value: 15 } } },
      ])
  
      const categories = {
        pwd: 'PWD',
        soloParent: 'Solo Parent',
        senior: 'Senior Citizen'
      }
  
      const navItems = [
      { name: 'Dashboard', route: '/Dashboard' },
        { name: 'Schedule', route: '/Schedule' },
        { name: 'Barangay Management', route: '/Barangaym'},
        { name: 'Assistance Management', route: '/AssistanceManagement'},
        { name: 'Card Management', route: '/CardManagement' },
        { name: 'User Management', route: '/user-management'},
      ]
  
      const filteredBarangays = computed(() => barangays.value.filter(b => b.stats[currentCategory.value]))
      const currentCategoryTitle = computed(() => categories[currentCategory.value])
  
      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
      }
  
      const openAddBarangayModal = () => {
        isModalOpen.value = true
        isEditing.value = false
        barangayForm.value = { name: '', stats: { pwd: { value: 0 }, soloParent: { value: 0 }, senior: { value: 0 } } }
      }
  
      const closeModal = () => {
        isModalOpen.value = false
      }
  
      const saveBarangay = () => {
        if (isEditing.value) {
          const index = barangays.value.findIndex(b => b.id === barangayForm.value.id)
          if (index !== -1) {
            barangays.value[index] = { ...barangayForm.value }
          }
        } else {
          barangays.value.push({ id: Date.now(), ...barangayForm.value })
        }
        closeModal()
      }
  
      const editBarangay = (barangay) => {
        isModalOpen.value = true
        isEditing.value = true
        barangayForm.value = JSON.parse(JSON.stringify(barangay))
      }
  
      const deleteBarangay = (id) => {
        barangays.value = barangays.value.filter(b => b.id !== id)
      }
  
      return {
        isCollapsed,
        currentCategory,
        isModalOpen,
        isEditing,
        barangayForm,
        barangays,
        navItems,
        filteredBarangays,
        currentCategoryTitle,
        toggleSidebar,
        openAddBarangayModal,
        closeModal,
        saveBarangay,
        editBarangay,
        deleteBarangay
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: Arial, sans-serif;
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
  
  .nav-link:hover,
  .nav-link.router-link-active {
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
    margin-left: 250px;
    padding: 40px;
    flex-grow: 1;
    transition: margin-left 0.3s ease;
  }
  
  .main-content.collapsed {
    margin-left: 80px;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .page-title {
    font-size: 28px;
    color: #333;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
  }
  
  .category-select {
    margin-right: 15px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    font-size: 14px;
  }
  
  .add-barangay-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 14px;
  }
  
  .add-barangay-btn:hover {
    background-color: #45a049;
  }
  
  .table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .barangay-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .barangay-table th,
  .barangay-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .barangay-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
  }
  
  .barangay-table tr:last-child td {
    border-bottom: none;
  }
  
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-right: 5px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .edit-btn:hover {
    background-color: #e3f2fd;
  }
  
  .delete-btn:hover {
    background-color: #ffebee;
  }
  
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-content h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
  }
  
  .modal-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .cancel-btn,
  .save-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .cancel-btn {
    background-color: #f1f3f5;
    color: #333;
    margin-right: 10px;
  }
  
  .cancel-btn:hover {
    background-color: #e9ecef;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .save-btn:hover {
    background-color: #45a049;
  }
  </style>