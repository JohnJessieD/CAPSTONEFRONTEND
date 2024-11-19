<template>
    <div class="app-container">
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
  
      <main class="main-content">
        <div class="feedback-container">
          <h1 class="feedback-title">MSWD Citizen Feedback</h1>
          
          <div v-if="loading" class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading feedback...</p>
          </div>
      
          <div v-else-if="error" class="error-message">
            <h2>Error</h2>
            <p>{{ error }}</p>
          </div>
      
          <div v-else-if="feedback.length === 0" class="empty-state">
            <IconInbox class="empty-icon" />
            <p>No feedback available at the moment.</p>
          </div>
      
          <div v-else class="feedback-list">
            <TransitionGroup name="feedback-transition" tag="div">
              <div v-for="item in feedback" :key="item.id" class="feedback-item">
                <div class="feedback-header">
                  <span class="category-badge" :class="getCategoryClass(item.category)">
                    {{ item.category }}
                  </span>
                  <span class="feedback-date">{{ formatDate(item.created_at) }}</span>
                </div>
                <p class="feedback-message">{{ item.message }}</p>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import {
    Home,
    Calendar,
    HandsHelping,
    CreditCard,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Inbox as IconInbox
  } from 'lucide-vue-next'
  
  const route = useRoute()
  const currentRoute = computed(() => route.path)
  const isCollapsed = ref(false)
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
  
  const feedback = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const fetchFeedback = async () => {
    try {
      const response = await axios.get('/api/feedback')
      feedback.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch feedback. Please try again later.'
    } finally {
      loading.value = false
    }
  }
  
  const getCategoryClass = (category) => {
    const classes = {
      'general': 'general',
      'service': 'service',
      'policy': 'policy',
      'suggestion': 'suggestion'
    }
    return classes[category] || 'default'
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  onMounted(fetchFeedback)
  </script>
  
  <style scoped>
  .app-container {
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
  
  .nav-link:hover,
  .nav-link.active {
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
    margin-left: 250px;
    transition: margin-left 0.3s ease;
  }
  
  .sidebar.collapsed + .main-content {
    margin-left: 80px;
  }
  
  .feedback-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    min-height: 100vh;
    color: #333;
  }
  
  .feedback-title {
    font-size: 2.5rem;
    color: #1a365d;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: bold;
  }
  
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  
  .spinner {
    border: 4px solid #e2e8f0;
    border-top: 4px solid #2b6cb0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-message {
    background-color: #fff5f5;
    border-left: 5px solid #fc8181;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
  }
  
  .error-message h2 {
    color: #c53030;
    margin-top: 0;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .empty-icon {
    width: 64px;
    height: 64px;
    color: #a0aec0;
    margin-bottom: 1rem;
  }
  
  .feedback-list {
    display: grid;
    gap: 1.5rem;
  }
  
  .feedback-item {
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .feedback-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .category-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: bold;
  }
  
  .category-badge.general { background-color: #ebf8ff; color: #2b6cb0; }
  .category-badge.service { background-color: #e6fffa; color: #2c7a7b; }
  .category-badge.policy { background-color: #faf5ff; color: #6b46c1; }
  .category-badge.suggestion { background-color: #fffaf0; color: #975a16; }
  .category-badge.default { background-color: #edf2f7; color: #4a5568; }
  
  .feedback-date {
    font-size: 0.875rem;
    color: #718096;
  }
  
  .feedback-message {
    color: #2d3748;
    line-height: 1.6;
  }
  
  .feedback-transition-enter-active,
  .feedback-transition-leave-active {
    transition: all 0.5s ease;
  }
  
  .feedback-transition-enter-from,
  .feedback-transition-leave-to {
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
  
    .sidebar.collapsed + .main-content {
      margin-left: 0;
    }
  
    .feedback-container {
      padding: 1rem;
    }
  
    .feedback-title {
      font-size: 2rem;
    }
  
    .feedback-item {
      padding: 1rem;
    }
  }
  </style>