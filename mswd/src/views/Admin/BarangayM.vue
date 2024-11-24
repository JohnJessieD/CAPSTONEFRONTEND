<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
        <a 
          v-for="(item, index) in navItems" 
          :key="index" 
          :href="item.route" 
          class="nav-link"
          :class="{ 'active': currentRoute === item.route }"
        >
          <component :is="item.icon" :size="24" />
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </a>
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

    <main class="main-content" :class="{ 'collapsed': isCollapsed }">
      <div class="content-wrapper">
        <!-- New Dashboard Stats Section -->
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>Total Residents</h3>
            <p>{{ dashboardStats.total_residents }}</p>
          </div>
          <div class="stat-card">
            <h3>PWD Count</h3>
            <p>{{ dashboardStats.pwd_count }}</p>
          </div>
          <div class="stat-card">
            <h3>Senior Citizen Count</h3>
            <p>{{ dashboardStats.senior_citizen_count }}</p>
          </div>
          <div class="stat-card">
            <h3>Solo Parent Count</h3>
            <p>{{ dashboardStats.solo_parent_count }}</p>
          </div>
        </div>

        <header class="main-header">
          <h1 class="page-title">Resident Management</h1>
          <div class="header-actions">
            <div class="search-bar">
              <input 
                v-model="searchQuery" 
                @input="searchResidents" 
                placeholder="Search residents..." 
                class="search-input"
              />
              <Search :size="20" class="search-icon" />
            </div>
            <select v-model="currentCategory" class="category-select">
              <option value="">All Categories</option>
              <option value="PWD">PWD</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Solo Parent">Solo Parent</option>
            </select>
            <select v-model="currentBarangay" class="barangay-select">
              <option value="">All Barangays</option>
              <option v-for="barangay in barangays" :key="barangay" :value="barangay">
                {{ barangay }}
              </option>
            </select>
          </div>
        </header>

        <div class="action-buttons">
          <button @click="openModal()" class="add-btn">
            <UserPlus :size="20" />
            Add Resident
          </button>
          <button @click="exportToExcel()" class="export-btn">
            <FileSpreadsheet :size="20" />
            Export to Excel
          </button>
          <button @click="generateReport()" class="report-btn">
            <FileText :size="20" />
            Generate Report
          </button>
        </div>

        <div v-if="loading" class="loading">
          <Loader :size="40" class="spinner" />
          Loading...
        </div>

        <div v-else-if="error" class="error">
          <AlertCircle :size="24" />
          {{ error }}
        </div>

        <div v-else class="table-container">
          <table class="resident-table">
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Category</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>Barangay</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resident in residents" :key="resident.id">
                <td>{{ resident.id_number }}</td>
                <td>{{ resident.last_name }}, {{ resident.first_name }} {{ resident.middle_name }}</td>
                <td>
                  <span :class="['category-badge', resident.category.toLowerCase().replace(' ', '-')]">
                    {{ resident.category }}
                  </span>
                </td>
                <td>{{ formatDate(resident.date_of_birth) }}</td>
                <td>{{ resident.contact_number }}</td>
                <td>{{ resident.address }}</td>
                <td>
                  <button @click="showDetails(resident)" class="action-btn details-btn" title="View Details">
                    <Eye :size="18" />
                  </button>
                  <button @click="openModal(resident)" class="action-btn edit-btn" title="Edit">
                    <Edit :size="18" />
                  </button>
                  <button @click="deleteResident(resident.id)" class="action-btn delete-btn" title="Delete">
                    <Trash2 :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!loading && !error" class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="page-btn">
            <ChevronLeft :size="20" />
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>
    </main>

    <!-- Resident Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <h2>{{ isEditing ? 'Edit Resident' : 'Add Resident' }}</h2>
          <form @submit.prevent="saveResident">
            <div class="form-group">
              <label for="category">Category:</label>
              <select v-model="form.category" id="category" required>
                <option value="PWD">PWD</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Solo Parent">Solo Parent</option>
              </select>
            </div>
            <div class="form-group">
              <label for="id_number">ID Number:</label>
              <input v-model="form.id_number" id="id_number" required>
            </div>
            <div class="form-group">
              <label for="first_name">First Name:</label>
              <input v-model="form.first_name" id="first_name" required>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name:</label>
              <input v-model="form.last_name" id="last_name" required>
            </div>
            <div class="form-group">
              <label for="middle_name">Middle Name:</label>
              <input v-model="form.middle_name" id="middle_name">
            </div>
            <div class="form-group">
              <label for="date_of_birth">Date of Birth:</label>
              <input v-model="form.date_of_birth" id="date_of_birth" type="date" required>
            </div>
            <div class="form-group">
              <label for="gender">Gender:</label>
              <select v-model="form.gender" id="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <textarea v-model="form.address" id="address" required></textarea>
            </div>
            <div class="form-group">
              <label for="contact_number">Contact Number:</label>
              <input v-model="form.contact_number" id="contact_number" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input v-model="form.email" id="email" type="email">
            </div>
            
            <!-- Category-specific fields -->
            <div v-if="form.category === 'PWD'">
              <div class="form-group">
                <label for="disability_type">Disability Type:</label>
                <input v-model="form.details.disability_type" id="disability_type" required>
              </div>
              <div class="form-group">
                <label for="disability_cause">Disability Cause:</label>
                <input v-model="form.details.disability_cause" id="disability_cause">
              </div>
              <div class="form-group">
                <label for="disability_duration">Disability Duration:</label>
                <input v-model="form.details.disability_duration" id="disability_duration">
              </div>
            </div>
            
            <div v-if="form.category === 'Senior Citizen'">
              <div class="form-group">
                <label for="pension_type">Pension Type:</label>
                <select v-model="form.details.pension_type" id="pension_type">
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div class="form-group">
                <label for="health_condition">Health Condition:</label>
                <textarea v-model="form.details.health_condition" id="health_condition"></textarea>
              </div>
            </div>
            
            <div v-if="form.category === 'Solo Parent'">
              <div class="form-group">
                <label for="reason_for_being_solo">Reason for Being Solo Parent:</label>
                <textarea v-model="form.details.reason_for_being_solo" id="reason_for_being_solo" required></textarea>
              </div>
              <div class="form-group">
                <label for="number_of_children">Number of Children:</label>
                <input v-model.number="form.details.number_of_children" id="number_of_children" type="number" min="1" required>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="save-btn">
                <Save :size="20" />
                {{ isEditing ? 'Update' : 'Add' }}
              </button>
              <button @click="closeModal" type="button" class="cancel-btn">
                <X :size="20" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Details Modal -->
    <transition name="fade">
      <div v-if="isDetailsModalOpen" class="modal">
        <div class="modal-content">
          <h2>Resident Details</h2>
          <div v-if="selectedResident" class="resident-details">
            <p><strong>ID Number:</strong> {{ selectedResident.id_number }}</p>
            <p><strong>Name:</strong> {{ selectedResident.last_name }}, {{ selectedResident.first_name }} {{ selectedResident.middle_name }}</p>
            <p><strong>Category:</strong> {{ selectedResident.category }}</p>
            <p><strong>Date of Birth:</strong> {{ formatDate(selectedResident.date_of_birth) }}</p>
            <p><strong>Gender:</strong> {{ selectedResident.gender }}</p>
            <p><strong>Address:</strong> {{ selectedResident.address }}</p>
            <p><strong>Contact Number:</strong> {{ selectedResident.contact_number }}</p>
            <p><strong>Email:</strong> {{ selectedResident.email }}</p>
            <h3>Additional Details:</h3>
            <div v-if="selectedResident.category === 'PWD'">
              <p><strong>Disability Type:</strong> {{ selectedResident.details?.disability_type || 'N/A' }}</p>
              <p><strong>Disability Cause:</strong> {{ selectedResident.details?.disability_cause || 'N/A' }}</p>
              <p><strong>Disability Duration:</strong> {{ selectedResident.details?.disability_duration || 'N/A' }}</p>
            </div>
            <div v-else-if="selectedResident.category === 'Senior Citizen'">
              <p><strong>Pension Type:</strong> {{ selectedResident.details?.pension_type || 'N/A' }}</p>
              <p><strong>Health Condition:</strong> {{ selectedResident.details?.health_condition || 'N/A' }}</p>
            </div>
            <div v-else-if="selectedResident.category === 'Solo Parent'">
              <p><strong>Reason for Being Solo Parent:</strong> {{ selectedResident.details?.reason_for_being_solo || 'N/A' }}</p>
              <p><strong>Number of Children:</strong> {{ selectedResident.details?.number_of_children || 'N/A' }}</p>
            </div>
          </div>
          <button @click="closeDetailsModal" class="close-btn">
            <X :size="20" />
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { 
  Home, Calendar, HandsHelping, CreditCard, Users, LogOut, 
  ChevronLeft, ChevronRight, Edit, Trash2, UserPlus, 
  FileSpreadsheet, FileText, Eye, Save, X, Search, Loader, AlertCircle 
} from 'lucide-vue-next'

const isCollapsed = ref(false)
const currentCategory = ref('')
const currentBarangay = ref('')
const isModalOpen = ref(false)
const isDetailsModalOpen = ref(false)
const isEditing = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10
const residents = ref([])
const searchQuery = ref('')
const selectedResident = ref(null)
const loading = ref(false)
const error = ref(null)
const barangays = ref([])
const currentRoute = ref('/Dashboard')
const form = ref({
  id: null,
  category: '',
  id_number: '',
  first_name: '',
  last_name: '',
  middle_name: '',
  date_of_birth: '',
  gender: '',
  address: '',
  contact_number: '',
  email: '',
details: {}
})

const dashboardStats = ref({
  total_residents: 0,
  pwd_count: 0,
  senior_citizen_count: 0,
  solo_parent_count: 0
})

const navItems = [
  { name: 'Dashboard', route: '/Dashboard', icon: Home },
  { name: 'Schedule', route: '/Schedule', icon: Calendar },
  { name: 'Barangay Management', route: '/Barangaym', icon: Users },
  { name: 'AssistanceManagement', route: '/AssistanceManagement', icon: HandsHelping },
  { name: 'Card Management', route: '/CardManagement', icon: CreditCard },
  { name: 'User Management', route: '/user-management', icon: Users },
  { name: 'Publication Manager', route: '/PublicationManager', icon: Users },
  { name: 'Events Manager', route: '/EventsManager', icon: Calendar },
  { name: 'Feedback List', route: '/FeedbackList', icon: Users },
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const fetchResidents = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('/api/residents', {
      params: { 
        category: currentCategory.value,
        barangay: currentBarangay.value,
        search: searchQuery.value,
        page: currentPage.value,
        limit: itemsPerPage
      }
    })
    residents.value = response.data.residents.map(resident => ({
      ...resident,
      details: typeof resident.details === 'string' ? JSON.parse(resident.details) : resident.details
    }))
    totalPages.value = response.data.pager.pages
  } catch (err) {
    console.error('Error fetching residents:', err)
    error.value = 'Failed to fetch residents. Please try again.'
  } finally {
    loading.value = false
  }
}

const fetchBarangays = async () => {
  try {
    const response = await axios.get('/api/barangays')
    barangays.value = response.data
  } catch (err) {
    console.error('Error fetching barangays:', err)
  }
}

const fetchDashboardStats = async () => {
  try {
    const response = await axios.get('/api/dashboard/stats')
    dashboardStats.value = response.data
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
}

const searchResidents = () => {
  currentPage.value = 1
  fetchResidents()
}

const openModal = (resident = null) => {
  if (resident) {
    form.value = { 
      ...resident,
      details: typeof resident.details === 'string' ? JSON.parse(resident.details) : resident.details
    }
    isEditing.value = true
  } else {
    form.value = {
      id: null,
      category: '',
      id_number: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      date_of_birth: '',
      gender: '',
      address: '',
      contact_number: '',
      email: '',
      details: {}
    }
    isEditing.value = false
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  form.value = {
    id: null,
    category: '',
    id_number: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    contact_number: '',
    email: '',
    details: {}
  }
}

const saveResident = async () => {
  try {
    const residentData = { 
      ...form.value,
      details: JSON.stringify(form.value.details)
    }
    
    if (isEditing.value) {
      await axios.post(`/api/update/${residentData.id}`, residentData)
    } else {
      await axios.post('/api/addresidents', residentData)
    }
    
    alert(isEditing.value ? 'Resident updated successfully!' : 'Resident added successfully!')
    await fetchResidents()
    await fetchDashboardStats() // Refresh dashboard stats after adding/updating a resident
    closeModal()
  } catch (error) {
    console.error('Error saving resident:', error)
    alert('Failed to save resident. Please try again.')
  }
}

const deleteResident = async (id) => {
  if (confirm('Are you sure you want to delete this resident?')) {
    try {
      await axios.delete(`/api/delresidents/${id}`)
      alert('Resident deleted successfully!')
      await fetchResidents()
      await fetchDashboardStats() // Refresh dashboard stats after deleting a resident
    } catch (error) {
      console.error('Error deleting resident:', error)
      alert('Failed to delete resident. Please try again.')
    }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const changePage = (page) => {
  currentPage.value = page
  fetchResidents()
}

const exportToExcel = async () => {
  try {
    const response = await axios.get('/api/Exlresidents/export/excel', {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'residents.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error exporting to Excel:', error)
    alert('Failed to export data. Please try again.')
  }
}

const generateReport = async () => {
  try {
    const response = await axios.get('/api/residents/report', {
      params: {
        category: currentCategory.value,
        barangay: currentBarangay.value
      },
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'residents_report.pdf') // Changed file extension to .pdf
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error generating report:', error)
    alert('Failed to generate report. Please try again.')
  }
}

const showDetails = (resident) => {
  selectedResident.value = {
    ...resident,
    details: typeof resident.details === 'string' ? JSON.parse(resident.details) : resident.details
  }
  isDetailsModalOpen.value = true
}

const closeDetailsModal = () => {
  isDetailsModalOpen.value = false
  selectedResident.value = null
}

watch([currentCategory, currentBarangay, searchQuery], () => {
  currentPage.value = 1
  fetchResidents()
})

onMounted(() => {
  fetchResidents()
  fetchBarangays()
  fetchDashboardStats()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
}

.sidebar {
  width: 250px;
  background-color: #1a237e;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.sidebar-title {
  margin-left: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.sidebar-nav {
  margin-top: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link:hover, .nav-link.active {
  background-color: #3949ab;
}

.nav-link span {
  margin-left: 10px;
}

.user-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 20px;
  transition: all 0.3s ease;
}

.main-content.collapsed {
  margin-left: 60px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 2rem;
  color: #1a237e;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-bar {
  position: relative;
}

.search-input {
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.category-select, .barangay-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-btn, .export-btn, .report-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn {
  background-color: #4caf50;
  color: white;
}

.export-btn {
  background-color: #2196f3;
  color: white;
}

.report-btn {
  background-color: #ff9800;
  color: white;
}

.add-btn:hover, .export-btn:hover, .report-btn:hover {
  opacity: 0.9;
}

.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.resident-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.resident-table th,
.resident-table td {
  padding: 12px;
  text-align: left;
}

.resident-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.resident-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.resident-table tr:hover {
  background-color: #e8eaf6;
}

.category-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.category-badge.pwd {
  background-color: #e1f5fe;
  color: #0288d1;
}

.category-badge.senior-citizen {
  background-color: #fff3e0;
  color: #ff9800;
}

.category-badge.solo-parent {
  background-color: #e8f5e9;
  color: #4caf50;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin: 0 2px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #e0e0e0;
}

.details-btn {
  color: #2196f3;
}

.edit-btn {
  color: #4caf50;
}

.delete-btn {
  color: #f44336;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.page-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.page-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal {
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

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn, .cancel-btn, .close-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}


.save-btn {
  background-color: #4caf50;
  color: white;
}

.cancel-btn, .close-btn {
  background-color: #f44336;
  color: white;
}

.save-btn:hover, .cancel-btn:hover, .close-btn:hover {
  opacity: 0.9;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
}

.spinner {
  margin-right: 10px;
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

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #1a237e;
}
</style>

