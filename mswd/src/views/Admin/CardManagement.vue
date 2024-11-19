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

    <main class="main-content" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="content-wrapper">
        <h1 class="page-title">Membership Management</h1>

        <div class="dashboard-stats">
          <div v-for="stat in stats" :key="stat.title" class="stat-card">
            <component :is="stat.icon" class="stat-icon" />
            <div class="stat-content">
              <h3>{{ stat.title }}</h3>
              <p>{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <div class="search-filter">
          <div class="search-box">
            <input v-model="searchQuery" type="text" placeholder="Search members...">
            <SearchIcon class="search-icon" />
          </div>
          <select v-model="filterCategory" class="filter-dropdown">
            <option value="">All Categories</option>
            <option value="Senior">Senior</option>
            <option value="PWD">PWD</option>
            <option value="Solo Parent">Solo Parent</option>
          </select>
        </div>

        <div v-if="isLoading" class="loading-state">
          <div class="loader"></div>
          <p>Loading membership data...</p>
        </div>

        <TransitionGroup name="card-list" tag="div" class="membership-cards-grid">
          <div v-for="member in filteredMembers" :key="member.id" class="membership-card">
            <div class="membership-card-header">
              <UserIcon class="user-icon" />
              <h3>{{ member.name }}</h3>
            </div>
            <div class="membership-card-body">
              <p><strong>Category:</strong> {{ member.category }}</p>
              <p><strong>Date of Birth:</strong> {{ member.dob }}</p>
              <p><strong>Sickness:</strong> {{ member.sickness }}</p>
              <p><strong>Address:</strong> {{ member.address }}</p>
              <p><strong>ID Number:</strong> {{ member.idnumber || 'N/A' }}</p>
            </div>
            <div class="membership-card-footer">
              <button @click="viewCertificate(member)" class="view-button">
                <FileIcon class="button-icon" />
                View Certificate
              </button>
              <button @click="editMember(member)" class="edit-button">
                <EditIcon class="button-icon" />
                Edit
              </button>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="filteredMembers.length === 0 && !isLoading" class="no-results">
          <FileQuestionIcon class="no-results-icon" />
          <p>No members found. Try adjusting your search or filter.</p>
        </div>
      </div>
    </main>

    <div v-if="showCertificateModal" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Member Certificate</h2>
        <div class="certificate-preview">
          <div class="id-card" @click="flipCard">
            <div class="id-card-front" :class="{ 'is-flipped': isCardFlipped }">
              <div class="id-card-header">
                <img src="/img/Download.jpg" alt="Logo" class="id-logo">
                <h3>MSWD Membership Card</h3>
              </div>
              <div class="id-card-body">
                <div class="id-photo-placeholder">
                  <img :src="selectedMember.photo || '/placeholder.svg?height=120&width=120'" alt="Member Photo">
                </div>
                <div class="id-details">
                  <p class="member-name">{{ selectedMember.name }}</p>
                  <p class="member-category">{{ selectedMember.category }}</p>
                  <p class="member-id">ID: {{ selectedMember.idnumber || 'N/A' }}</p>
                </div>
              </div>
              <div class="id-card-footer">
                <p class="expiry-date">Expires: {{ expiryDate }}</p>
              </div>
            </div>
            <div class="id-card-back" :class="{ 'is-flipped': isCardFlipped }">
              <div class="back-header">Additional Information</div>
              <div class="back-body">
                <p><strong>Date of Birth:</strong> {{ selectedMember.dob }}</p>
                <p><strong>Address:</strong> {{ selectedMember.address || 'N/A' }}</p>
                <p><strong>Emergency Contact:</strong> {{ selectedMember.emergencyContact || 'N/A' }}</p>
              </div>
              <div class="back-footer">
                <p>This card is the property of the Municipal Social Welfare and Development Office.</p>
                <p>If found, please return to the nearest MSWD office.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="printCertificate(selectedMember)" class="print-button">
            <PrinterIcon class="button-icon" />
            Print Card
          </button>
          <button @click="closeCertificateModal" class="close-button">Close</button>
        </div>
      </div>
    </div>

    <div v-if="editingMember" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Edit Membership</h2>
        <form @submit.prevent="updateMember" enctype="multipart/form-data">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="editingMember.name" id="name" required>
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <select v-model="editingMember.category" id="category" required>
              <option value="Senior">Senior</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input v-model="editingMember.dob" id="dob" type="date" required>
          </div>
          <div class="form-group">
            <label for="sickness">Sickness:</label>
            <input v-model="editingMember.sickness" id="sickness" required>
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input v-model="editingMember.address" id="address" required>
          </div>
          <div class="form-group">
            <label for="idnumber">ID Number:</label>
            <input v-model="editingMember.idnumber" id="idNumber" required>
          </div>
          <div class="form-group">
            <label for="emergencyContact">Emergency Contact:</label>
            <input v-model="editingMember.emergencyContact" id="emergencyContact">
          </div>
          <div class="form-group">
            <label for="certificate">Certificate:</label>
            <input type="file" id="certificate" @change="handleFileUpload" accept="image/*">
          </div>
          <div class="form-actions">
            <button type="submit" class="save-button">Save</button>
            <button type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Home, 
  Calendar, 
  HandsHelping, 
  CreditCard, 
  Users as UsersIcon, 
  LogOut,
  Search as SearchIcon,
  User as UserIcon,
  File as FileIcon,
  Edit as EditIcon,
  FileQuestion as FileQuestionIcon,
  Printer as PrinterIcon,
  UserPlus as UserPlusIcon,
  Activity as ActivityIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import axios from 'axios'

const isCollapsed = ref(false)
const isLoading = ref(true)
const members = ref([])
const searchQuery = ref('')
const filterCategory = ref('')
const editingMember = ref(null)
const newCertificate = ref(null)
const showCertificateModal = ref(false)
const selectedMember = ref(null)
const isCardFlipped = ref(false)

const navItems = [
  { name: 'Dashboard', route: '/Dashboard' },
  { name: 'Schedule', route: '/Schedule' },
  { name: 'Barangay Management', route: '/Barangaym' },
  { name: 'AssistanceManagement', route: '/AssistanceManagement' },
  { name: 'Card Management', route: '/CardManagement' },
  { name: 'User Management', route: '/user-management' },
  { name: 'Publication Manager', route: '/PublicationManager' },
  { name: 'Events Manager', route: '/EventsManager' },
  { name: 'Feedback List', route: '/FeedbackList' },
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const fetchMembers = async () => {
  try {
    const response = await axios.get('/api/showmembers')
    members.value = response.data
  } catch (error) {
    console.error('Error fetching members:', error)
    alert('Failed to fetch members. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const filteredMembers = computed(() => {
  return members.value.filter(member => 
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (filterCategory.value === '' || member.category === filterCategory.value)
  )
})

const viewCertificate = (member) => {
  selectedMember.value = member
  showCertificateModal.value = true
  isCardFlipped.value = false
}

const closeCertificateModal = () => {
  showCertificateModal.value = false
  selectedMember.value = null
}

const flipCard = () => {
  isCardFlipped.value = !isCardFlipped.value
}

const expiryDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 5)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const printCertificate = (user) => {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>MSWD Membership Card - ${user.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .id-card {
            width: 3.375in;
            height: 2.125in;
            background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
          }
          .id-card-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .id-logo {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          .id-card-body {
            display: flex;
            padding: 15px;
          }
          .id-photo-placeholder {
            width: 80px;
            height: 80px;
            background-color: #ddd;
            border: 2px solid #4CAF50;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            color: #666;
            margin-right: 15px;
            overflow: hidden;
          }
          .id-photo-placeholder img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .id-details {
            flex: 1;
          }
          .id-details p {
            margin: 3px 0;
            font-size: 12px;
          }
          .member-name {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .member-category {
            font-size: 14px;
            color: #4CAF50;
          }
          .id-card-footer {
            position: absolute;
            bottom: 10px;
            left: 15px;
            right: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .expiry-date {
            font-size: 12px;
            color: #666;
          }
          @media print {
            body {
              background-color: white;
            }
            .id-card {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="id-card">
          <div class="id-card-header">
            <img src="/img/Download.jpg" alt="Logo" class="id-logo">
            <h3>MSWD Membership Card</h3>
          </div>
          <div class="id-card-body">
            <div class="id-photo-placeholder">
              <img src="${user.photo || '/placeholder.svg?height=80&width=80'}" alt="Member Photo">
            </div>
            <div class="id-details">
              <p class="member-name">${user.name}</p>
              <p class="member-category">${user.category}</p>
              <p>ID: ${user.idnumber || 'N/A'}</p>
              <p>DOB: ${user.dob}</p>
              <p>Address: ${user.address || 'N/A'}</p>
            </div>
          </div>
          <div class="id-card-footer">
            <p class="expiry-date">Expires: ${new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        <\/script>
      </body>
    <\/html>
  `)
  printWindow.document.close()
}

const editMember = (member) => {
  editingMember.value = { ...member }
}

const handleFileUpload = (event) => {
  newCertificate.value = event.target.files[0]
}

const updateMember = async () => {
  try {
    const formData = new FormData()
    formData.append('name', editingMember.value.name)
    formData.append('category', editingMember.value.category)
    formData.append('dob', editingMember.value.dob)
    formData.append('sickness', editingMember.value.sickness)
    formData.append('address', editingMember.value.address)
    formData.append('idnumber', editingMember.value.idnumber)
    formData.append('emergencyContact', editingMember.value.emergencyContact)
    if (newCertificate.value) {
      formData.append('certificate', newCertificate.value)
    }

    const response = await axios.post(`/api/editMembership/${editingMember.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.status === 'success') {
      const updatedMember = response.data.data
      const index = members.value.findIndex(m => m.id === updatedMember.id)
      if (index !== -1) {
        members.value[index] = updatedMember
      }
      cancelEdit()
      alert('Member updated successfully!')
    } else {
      throw new Error(response.data.message || 'Failed to update member')
    }
  } catch (error) {
    console.error('Error updating member:', error)
    alert(`Failed to update member: ${error.message}`)
  }
}

const cancelEdit = () => {
  editingMember.value = null
  newCertificate.value = null
}

const newMembersThisMonth = computed(() => {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  return members.value.filter(member => new Date(member.created_at) >= monthStart).length
})

const activeMembers = computed(() => {
  return members.value.filter(member => member.certificate).length
})

const stats = computed(() => [
  { title: 'Total Members', value: members.value.length, icon: UsersIcon },
  { title: 'New This Month', value: newMembersThisMonth.value, icon: UserPlusIcon },
  { title: 'Active Members', value: activeMembers.value, icon: ActivityIcon },
])

onMounted(() => {
  fetchMembers()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
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
  padding: 2rem;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 2rem;
  font-weight: 700;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
  color: #4CAF50;
}

.stat-content h3 {
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-content p {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0.25rem 0 0;
}

.search-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex-grow: 1;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.filter-dropdown {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s ease;
}

.filter-dropdown:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.membership-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.membership-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.membership-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.membership-card-header {
  background-color: #4CAF50;
  color: white;
  padding: 1.25rem;
  display: flex;
  align-items: center;
}

.user-icon {
  margin-right: 0.75rem;
}

.membership-card-body {
  padding: 1.25rem;
}

.membership-card-body p {
  margin-bottom: 0.5rem;
}

.membership-card-footer {
  padding: 1.25rem;
  background-color: #f7fafc;
  display: flex;
  justify-content: space-between;
}

.view-button, .edit-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.view-button {
  background-color: #4CAF50;
  color: white;
}

.view-button:hover {
  background-color: #45a049;
}

.edit-button {
  background-color: #f0f2f5;
  color: #4a5568;
}

.edit-button:hover {
  background-color: #e2e8f0;
}

.button-icon {
  margin-right: 0.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #718096;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.5s ease;
}
.card-list-enter-from,
.card-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
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

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button,
.cancel-button,
.print-button,
.close-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button,
.print-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:hover,
.print-button:hover {
  background-color: #45a049;
}
</style>