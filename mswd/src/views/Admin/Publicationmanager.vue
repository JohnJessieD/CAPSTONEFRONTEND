<template>
  <div class="dashboard">
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

    <div class="main-content" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="publication-manager">
        <header>
          <h1>MSWD Publication Manager</h1>
        </header>

        <main>
          <section class="publication-form-section">
            <h2>{{ editingId ? 'Edit Publication' : 'Add New Publication' }}</h2>
            <form @submit.prevent="submitPublication" class="publication-form">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  v-model="newPublication.title"
                  id="title"
                  type="text"
                  required
                  placeholder="Enter publication title"
                >
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  v-model="newPublication.description"
                  id="description"
                  required
                  placeholder="Enter publication description"
                  rows="4"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="publication_date">Publication Date</label>
                <input
                  v-model="newPublication.publication_date"
                  id="publication_date"
                  type="date"
                  required
                >
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  {{ editingId ? 'Update Publication' : 'Add Publication' }}
                </button>
                <button
                  v-if="editingId"
                  @click="cancelEdit"
                  type="button"
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>

          <section class="publications-list-section">
            <h2>Publications List</h2>
            <div v-if="loading" class="loading">
              <div class="spinner"></div>
              <p>Loading publications...</p>
            </div>
            <div v-else-if="error" class="error-message">
              {{ error }}
            </div>
            <div v-else-if="publications.length === 0" class="no-publications">
              <p>No publications found. Add your first publication above.</p>
            </div>
            <transition-group name="list" tag="ul" v-else class="publications-list">
              <li v-for="pub in publications" :key="pub.id" class="publication-item">
                <div class="publication-content">
                  <h3>{{ pub.title }}</h3>
                  <p class="description">{{ pub.description }}</p>
                  <p class="date">
                    {{ formatDate(pub.publication_date) }}
                  </p>
                </div>
                <div class="publication-actions">
                  <button
                    @click="editPublication(pub)"
                    class="btn btn-edit"
                    aria-label="Edit publication"
                  >
                    Edit
                  </button>
                  <button
                    @click="deletePublication(pub.id)"
                    class="btn btn-delete"
                    aria-label="Delete publication"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </transition-group>
          </section>
        </main>

        <footer>
          <p>&copy; {{ currentYear }} MSWD Publication Manager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { 
  Home, Calendar, HandsHelping, CreditCard, Users, LogOut, 
  ChevronLeft, ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const currentRoute = computed(() => route.path)

const isCollapsed = ref(false)
const publications = ref([])
const newPublication = ref({
  title: '',
  description: '',
  publication_date: ''
})
const editingId = ref(null)
const loading = ref(true)
const error = ref(null)
const currentYear = new Date().getFullYear()

const navItems = [
  { name: 'Dashboard', route: '/Dashboard' },
  { name: 'Schedule', route: '/Schedule' },
  { name: 'Barangay Management', route: '/Barangaym' },
  { name: 'AssistancEManagement', route: '/AssistanceManagement' },
  { name: 'Card Management', route: '/CardManagement' },
  { name: 'User Management', route: '/user-management' },
  { name: 'Publication Manager', route: '/PublicationManager' },
  { name: 'Events Manager', route: '/EventsManager' },
  { name: 'Feedback List', route: '/FeedbackList' },
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const fetchPublications = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/publications')
    publications.value = response.data
    error.value = null
  } catch (err) {
    console.error('Error fetching publications:', err)
    error.value = 'Failed to load publications. Please try again.'
  } finally {
    loading.value = false
  }
}

const submitPublication = async () => {
  try {
    if (editingId.value) {
      await axios.post(`/api/publications/${editingId.value}`, newPublication.value)
    } else {
      await axios.post('/api/publications', newPublication.value)
    }
    await fetchPublications()
    resetForm()
  } catch (err) {
    console.error('Error submitting publication:', err)
    error.value = 'Failed to save publication. Please try again.'
  }
}

const editPublication = (publication) => {
  editingId.value = publication.id
  newPublication.value = { ...publication }
}

const cancelEdit = () => {
  resetForm()
}

const deletePublication = async (id) => {
  if (confirm('Are you sure you want to delete this publication?')) {
    try {
      await axios.delete(`/api/publications/${id}`)
      await fetchPublications()
    } catch (err) {
      console.error('Error deleting publication:', err)
      error.value = 'Failed to delete publication. Please try again.'
    }
  }
}

const resetForm = () => {
  newPublication.value = {
    title: '',
    description: '',
    publication_date: ''
  }
  editingId.value = null
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  fetchPublications()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
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

.nav-link:hover, .nav-link.active {
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
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.publication-manager {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: var(--background-color);
  color: var(--text-primary);
}

header {
  margin-bottom: 40px;
  text-align: center;
}

h1 {
  color: var(--primary-color);
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px var(--shadow-color);
}

h2 {
  color: var(--text-primary);
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.publication-form-section,
.publications-list-section {
  background-color: var(--surface-color);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px var(--shadow-color);
  transition: all 0.3s ease;
}

.publication-form-section:hover,
.publications-list-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-color);
}

.publication-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid black;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
  background-color: var(--surface-color);
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

textarea {
  resize: vertical;
  min-height: 120px;
  border: 2px solid black;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: black;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
}

.btn-secondary {
  background-color: var(--surface-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.loading,
.no-publications,
.error-message {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  margin-top: 20px;
  font-size: 1.1rem;
}

.error-message {
  color: var(--error-color);
  font-weight: bold;
}

.spinner {
  border: 4px solid rgba(52, 152, 219, 0.1);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.publications-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 20px;
}

.publication-item {
  background-color: var(--surface-color);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.publication-item:hover {
  box-shadow: 0 10px 15px var(--shadow-color);
  transform: translateY(-5px);
}

.publication-content h3 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.8rem;
  font-weight: 700;
}

.publication-content .description {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  font-size: 1.1rem;
}

.publication-content .date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: auto;
}

.publication-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.btn-edit,
.btn-delete {
  padding: 8px 16px;
  font-size: 14px;
  min-width: auto;
}

.btn-edit {
  background-color: var(--surface-color);
  color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.btn-edit:hover {
  background-color: var(--secondary-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
}

.btn-delete {
  background-color: var(--surface-color);
  color: var(--error-color);
  border-color: var(--error-color);
}

.btn-delete:hover {
  background-color: var(--error-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(231, 76, 60, 0.2);
}

footer {
  margin-top: 60px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

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
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }

  .publication-manager {
    padding: 20px 10px;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .publication-form-section,
  .publications-list-section {
    padding: 20px;
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .publication-actions {
    flex-direction: column;
  }
}
</style>