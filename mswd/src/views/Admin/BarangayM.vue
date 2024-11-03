<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <h1 v-if="!isCollapsed" class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
        <a v-for="(item, index) in navItems" :key="index" :href="item.route" class="nav-link">
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
        <header class="main-header">
          <h1 class="page-title">Resident Management</h1>
          <div class="header-actions">
            <select v-model="currentCategory" class="category-select">
              <option value="">All Categories</option>
              <option value="PWD">PWD</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Solo Parent">Solo Parent</option>
            </select>
            <input 
              v-model="searchQuery" 
              @input="searchResidents" 
              placeholder="Search residents..." 
              class="search-input"
            />
            <button @click="openModal()" class="add-btn">Add Resident</button>
            <button @click="exportToExcel()" class="export-btn">Export to Excel</button>
          </div>
        </header>

        <div class="table-container">
          <table class="resident-table">
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Category</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resident in residents" :key="resident.id">
                <td>{{ resident.id_number }}</td>
                <td>{{ resident.last_name }}, {{ resident.first_name }} {{ resident.middle_name }}</td>
                <td>{{ resident.category }}</td>
                <td>{{ formatDate(resident.date_of_birth) }}</td>
                <td>{{ resident.contact_number }}</td>
                <td>
                  <button @click="showDetails(resident)" class="action-btn details-btn">
                    View Details
                  </button>
                </td>
                <td>
                  <button @click="openModal(resident)" class="action-btn edit-btn">
                    <Edit :size="16" />
                  </button>
                  <button @click="deleteResident(resident.id)" class="action-btn delete-btn">
                    <Trash2 :size="16" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&laquo; Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next &raquo;</button>
        </div>
      </div>
    </main>

    <!-- Resident Modal -->
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
            <button type="submit" class="save-btn">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button @click="closeModal" type="button" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="isDetailsModalOpen" class="modal">
      <div class="modal-content">
        <h2>Resident Details</h2>
        <div v-if="selectedResident">
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
            <p><strong>Disability Type:</strong> {{ selectedResident.details.disability_type }}</p>
            <p><strong>Disability Cause:</strong> {{ selectedResident.details.disability_cause }}</p>
            <p><strong>Disability Duration:</strong> {{ selectedResident.details.disability_duration }}</p>
          </div>
          <div v-else-if="selectedResident.category === 'Senior Citizen'">
            <p><strong>Pension Type:</strong> {{ selectedResident.details.pension_type }}</p>
            <p><strong>Health Condition:</strong> {{ selectedResident.details.health_condition }}</p>
          </div>
          <div v-else-if="selectedResident.category === 'Solo Parent'">
            <p><strong>Reason for Being Solo Parent:</strong> {{ selectedResident.details.reason_for_being_solo }}</p>
            <p><strong>Number of Children:</strong> {{ selectedResident.details.number_of_children }}</p>
          </div>
        </div>
        <button @click="closeDetailsModal" class="cancel-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { Home, Calendar, HandsHelping, CreditCard, Users, LogOut, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-vue-next'

export default {
  name: 'ResidentManagement',
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
    const currentCategory = ref('')
    const isModalOpen = ref(false)
    const isDetailsModalOpen = ref(false)
    const isEditing = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const itemsPerPage = 10
    const residents = ref([])
    const searchQuery = ref('')
    const selectedResident = ref(null)

    const form = ref({
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

    const navItems = [
      { name: 'Dashboard', route: '/Dashboard', icon: Home },
      { name: 'Schedule', route: '/Schedule', icon: Calendar },
      { name: 'Barangay Management', route: '/Barangaym', icon: HandsHelping },
      { name: 'Assistance Management', route: '/AssistanceManagement', icon: HandsHelping },
      { name: 'Card Management', route: '/CardManagement', icon: CreditCard },
      { name: 'User Management', route: '/user-management', icon: Users },
    ]

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const parseDetails = (detailsString) => {
      try {
        return JSON.parse(detailsString)
      } catch (error) {
        console.error('Error parsing details:', error)
        return {}
      }
    }

    const fetchResidents = async () => {
      try {
        const response = await axios.get('/api/residents', {
          params: { 
            category: currentCategory.value,
            search: searchQuery.value,
            page: currentPage.value,
            limit: itemsPerPage
          }
        })
        residents.value = response.data.residents.map(resident => ({
          ...resident,
          details: parseDetails(resident.details)
        }))
        totalPages.value = response.data.pager.pages
      } catch (error) {
        console.error('Error fetching residents:', error)
        alert('Failed to fetch residents. Please try again.')
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
          details: parseDetails(resident.details)
        }
        isEditing.value = true
      } else {
        form.value = {
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
    }

    const saveResident = async () => {
      try {
        const residentData = { 
          ...form.value,
          details: JSON.stringify(form.value.details)
        }
        
        if (isEditing.value) {
          await axios.put(`/api/updateresidents/${residentData.id}`, residentData)
          alert('Resident updated successfully!')
        } else {
          await axios.post('/api/addresidents', residentData)
          alert('Resident added successfully!')
        }
        await fetchResidents()
        closeModal()
      } catch (error) {
        console.error('Error saving resident:', error)
        alert('Failed to save resident. Please check your input and try again.')
      }
    }

    const deleteResident = async (id) => {
      if (confirm('Are you sure you want to delete this resident?')) {
        try {
          await axios.delete(`/api/delresidents/${id}`)
          alert('Resident deleted successfully!')
          await fetchResidents()
        } catch (error) {
          console.error('Error deleting resident:', error)
          alert('Failed to delete resident. Please try again.')
        }
      }
    }

    const formatDate = (dateString) => {
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
      } catch (error) {
        console.error('Error exporting to Excel:', error)
        alert('Failed to export data. Please try again.')
      }
    }

    const showDetails = (resident) => {
      selectedResident.value = resident
      isDetailsModalOpen.value = true
    }

    const closeDetailsModal = () => {
      isDetailsModalOpen.value = false
      selectedResident.value = null
    }

    watch([currentCategory, searchQuery], () => {
      currentPage.value = 1
      fetchResidents()
    })

    onMounted(() => {
      fetchResidents()
    })

    return {
      isCollapsed,
      currentCategory,
      isModalOpen,
      isDetailsModalOpen,
      isEditing,
      currentPage,
      totalPages,
      residents,
      searchQuery,
      form,
      navItems,
      selectedResident,
      toggleSidebar,
      searchResidents,
      openModal,
      closeModal,
      saveResident,
      deleteResident,
      formatDate,
      changePage,
      exportToExcel,
      showDetails,
      closeDetailsModal
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

.category-select,
.search-input {
  margin-right: 15px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
}

.add-btn,
.export-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
  margin-left: 10px;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
}

.export-btn {
  background-color: #2196F3;
  color: white;
}

.add-btn:hover,
.export-btn:hover {
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
  border-collapse: collapse;
}

.resident-table th,
.resident-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.resident-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.resident-table tr:last-child td {
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

.details-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-btn:hover {
  background-color: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5px;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
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
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
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

.form-group textarea {
  height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn,
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
}
</style>