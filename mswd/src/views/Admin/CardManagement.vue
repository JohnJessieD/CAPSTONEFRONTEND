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
    </aside>

    <main class="main-content" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="content-wrapper">
        <h1 class="page-title">Membership Management</h1>

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
          <Loader2Icon class="loading-icon" />
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
              <p v-if="member.certificate"><strong>Certificate:</strong> {{ member.certificate }}</p>
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
        <img :src="certificateUrl" alt="Member Certificate" style="max-width: 100%; height: auto;" />
        <div class="modal-actions">
          <button @click="printCertificate(selectedMember)" class="print-button">
            <PrinterIcon class="button-icon" />
            Print Certificate
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Home, 
  Calendar, 
  HandsHelping, 
  CreditCard, 
  Users, 
  LogOut,
  SearchIcon,
  UserIcon,
  FileIcon,
  EditIcon,
  Loader2Icon,
  FileQuestionIcon,
  PrinterIcon
} from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const isCollapsed = ref(false)
const isLoading = ref(true)
const members = ref([])
const searchQuery = ref('')
const filterCategory = ref('')
const editingMember = ref(null)
const newCertificate = ref(null)
const certificateUrl = ref('')
const showCertificateModal = ref(false)
const selectedMember = ref(null)

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

const fetchMembers = async () => {
  try {
    const response = await axios.get('/api/showmembers')
    members.value = response.data.map(member => ({
      ...member,
      category: member.category || 'Uncategorized',
      categoryAttachment: member.categoryAttachment || null
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
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
  if (member.certificate) {
    certificateUrl.value = member.certificate
    selectedMember.value = member
    showCertificateModal.value = true
  } else {
    alert('No certificate available for this member.')
  }
}

const closeCertificateModal = () => {
  showCertificateModal.value = false
  certificateUrl.value = ''
  selectedMember.value = null
}

const printCertificate = (user) => {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>User Card - ${user.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background-color: #f7fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .print-card {
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            padding: 40px;
            max-width: 400px;
            width: 100%;
            position: relative;
            overflow: hidden;
            border: 2px solid #4CAF50;
          }
          .print-header {
            margin-bottom: 30px;
            position: relative;
            z-index: 1;
          }
          .print-header::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: 0;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            transform: skewY(-5deg);
            z-index: -1;
          }
          .logo {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
          }
          .print-header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: white;
          }
          .print-body {
            padding: 0 20px;
          }
          .print-body p {
            margin: 15px 0;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
          }
          .print-body strong {
            font-weight: 600;
            color: #4a5568;
          }
          .print-footer {
            margin-top: 30px;
            font-size: 0.8em;
            text-align: center;
            color: #718096;
          }
          .qr-code {
            width: 100px;
            height: 100px;
            margin: 20px auto;
            background-color: #e2e8f0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #4a5568;
          }
          @media print {
            body {
              background-color: white;
            }
            .print-card {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-card">
          <div class="print-header">
            <img src="/img/Download.jpg" alt="Logo" class="logo">
            <h2>${user.name}</h2>
          </div>
          <div class="print-body">
            <p><strong>Category:</strong> <span>${user.category}</span></p>
            ${user.requirements ? `<p><strong>Requirements:</strong> <span>${user.requirements}</span></p>` : ''}
            ${user.dob ? `<p><strong>Date of Birth:</strong> <span>${user.dob}</span></p>` : ''}
            ${user.sickness ? `<p><strong>Sickness:</strong> <span>${user.sickness}</span></p>` : ''}
            ${user.certificate ? `<p><strong>Certificate:</strong> <span>${user.certificate}</span></p>` : ''}
            ${user.categoryAttachment ? `<p><strong>Category Attachment:</strong> <span>${user.categoryAttachment}</span></p>` : ''}
          </div>
          <div class="qr-code">QR Code Placeholder</div>
          <div class="print-footer">
            <p>Issued on: ${new Date().toLocaleDateString()}</p>
            <p>MSWD Admin | User ID: <span style="font-size: 1.2em; font-weight: bold;">${user.id || 'N/A'}</span></p>
          </div>
        </div>
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
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
    if (newCertificate.value) {
      formData.append('certificate', newCertificate.value)
    }
    if (editingMember.value.categoryAttachment) {
      formData.append('categoryAttachment', editingMember.value.categoryAttachment)
    }

    const response = await axios.post(`/api/membership/edit/${editingMember.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.status === 'success') {
      const updatedMember = response.data.data
      const index =   members.value.findIndex(m => m.id === updatedMember.id)
      if (index !== -1) {
        members.value[index] = updatedMember
      }
      cancelEdit()
    }
  } catch (error) {
    console.error('Error updating member:', error)
    alert('Failed to update member. Please try again.')
  }
}

const cancelEdit = () => {
  editingMember.value = null
  newCertificate.value = null
}

fetchMembers()
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
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
  font-size: 2rem;
  color: #1a202c;
  margin-bottom: 1.5rem;
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
  border-radius: 0.375rem;
  font-size: 1rem;
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
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
}

.membership-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.membership-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.membership-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.membership-card-header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
}

.user-icon {
  margin-right: 0.75rem;
}

.membership-card-body {
  padding: 1rem;
}

.membership-card-footer {
  padding: 1rem;
  background-color: #f7fafc;
  display: flex;
  justify-content: space-between;
}

.view-button, .edit-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
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

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
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
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.save-button,
.cancel-button,
.print-button,
.close-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
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

.cancel-button,
.close-button {
  background-color: #f0f2f5;
  color: #4a5568;
}

.cancel-button:hover,
.close-button:hover {
  background-color: #e2e8f0;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>