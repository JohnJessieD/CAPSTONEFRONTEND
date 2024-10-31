<template>
  <div class="dashboard">
    <!-- Sidebar (unchanged) -->
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

    <!-- Enhanced Main Content -->
    <main class="main-content" :class="{ 'expanded': isCollapsed }">
      <header class="main-header">
        <h2 class="page-title">Barangay Information System</h2>
        <div class="header-actions">
          <div class="search-container">
            <Search :size="20" class="search-icon" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Barangay..."
              class="search-input"
            />
          </div>
          <button class="refresh-button">
            <RefreshCw :size="20" /> Refresh Data
          </button>
        </div>
      </header>

      <div class="dashboard-grid">
        <div class="summary-cards">
          <div class="summary-card" v-for="(card, index) in summaryCards" :key="index">
            <component :is="card.icon" :size="32" class="card-icon" />
            <div class="card-content">
              <h4 class="card-title">{{ card.title }}</h4>
              <p class="card-value">{{ card.value }}</p>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <h3 class="section-title">Barangay Statistics</h3>
            <select v-model="selectedChartType" class="chart-type-select">
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
          <canvas ref="chartCanvas"></canvas>
        </div>

        <div class="barangay-list-container">
          <h3 class="section-title">Barangay List</h3>
          <div class="barangay-filters">
            <select v-model="selectedCategory" class="category-filter">
              <option value="all">All Categories</option>
              <option value="soloParent">Solo Parents</option>
              <option value="senior">Seniors</option>
              <option value="daycareCenter">Daycare Centers</option>
              <option value="pwd">PWDs</option>
            </select>
            <button class="export-btn">
              <Download :size="16" /> Export Data
            </button>
          </div>
          <ul class="barangay-list">
            <li
              v-for="barangay in filteredBarangays"
              :key="barangay.id"
              class="barangay-item"
              @click="selectBarangay(barangay)"
            >
              <div class="barangay-header">
                <span class="barangay-name">{{ barangay.name }}</span>
                <ChevronRight :size="16" class="barangay-arrow" />
              </div>
              <div class="barangay-stats">
                <span v-for="(stat, statName) in barangay.stats" :key="statName" :class="['stat-item', statName]">
                  <component :is="stat.icon" :size="16" /> {{ stat.value }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { Home, Calendar, HandsHelping, CreditCard, BarChart2, Users, MapPin, User, UserPlus, Baby, Wheelchair, ChevronLeft, ChevronRight, Search, RefreshCw, LogOut, Download } from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    Home, Calendar, HandsHelping, CreditCard, BarChart2, Users, MapPin, User, UserPlus, Baby, Wheelchair, ChevronLeft, ChevronRight, Search, RefreshCw, LogOut, Download
  },
  setup() {
    const isCollapsed = ref(false)
    const searchQuery = ref('')
    const chartCanvas = ref(null)
    const chart = ref(null)
    const selectedChartType = ref('bar')
    const selectedCategory = ref('all')

    const navItems = [
    { name: 'Dashboard', route: '/Dashboard' },
        { name: 'Schedule', route: '/Schedule' },
        { name: 'Barangay Management', route: '/Barangaym'},
        { name: 'Assistance Management', route: '/AssistanceManagement'},
        { name: 'Card Management', route: '/CardManagement' },
        { name: 'User Management', route: '/user-management'},
    ]

    const summaryCards = [
      { title: 'Total Barangays', value: 5, icon: MapPin },
      { title: 'Total Solo Parents', value: 65, icon: User },
      { title: 'Total Seniors', value: 155, icon: UserPlus },
      { title: 'Total PWDs', value: 32, icon: Wheelchair },
    ]

    const barangays = [
      { 
        id: 1, 
        name: 'Barangay Ilag', 
        stats: {
          soloParent: { value: 10, icon: User },
          senior: { value: 20, icon: UserPlus },
          daycareCenter: { value: 15, icon: Baby },
          pwd: { value: 5, icon: Wheelchair }
        }
      },
      { 
        id: 2, 
        name: 'Barangay Poblacion', 
        stats: {
          soloParent: { value: 8, icon: User },
          senior: { value: 15, icon: UserPlus },
          daycareCenter: { value: 20, icon: Baby },
          pwd: { value: 3, icon: Wheelchair }
        }
      },
      { 
        id: 3, 
        name: 'Bigaan', 
        stats: {
          soloParent: { value: 20, icon: User },
          senior: { value: 50, icon: UserPlus },
          daycareCenter: { value: 30, icon: Baby },
          pwd: { value: 10, icon: Wheelchair }
        }
      },
      { 
        id: 4, 
        name: 'San Antonio', 
        stats: {
          soloParent: { value: 15, icon: User },
          senior: { value: 30, icon: UserPlus },
          daycareCenter: { value: 25, icon: Baby },
          pwd: { value: 8, icon: Wheelchair }
        }
      },
      { 
        id: 5, 
        name: 'Santa Cruz', 
        stats: {
          soloParent: { value: 12, icon: User },
          senior: { value: 40, icon: UserPlus },
          daycareCenter: { value: 18, icon: Baby },
          pwd: { value: 6, icon: Wheelchair }
        }
      },
    ]

    const filteredBarangays = computed(() => {
      return barangays.filter((barangay) => {
        const nameMatch = barangay.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const categoryMatch = selectedCategory.value === 'all' || barangay.stats[selectedCategory.value]
        return nameMatch && categoryMatch
      })
    })

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const renderChart = () => {
      if (chart.value) {
        chart.value.destroy()
      }

      const ctx = chartCanvas.value.getContext('2d')
      const chartData = {
        labels: barangays.map((barangay) => barangay.name),
        datasets: [
          {
            label: 'Solo Parent',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            data: barangays.map((barangay) => barangay.stats.soloParent.value),
          },
          {
            label: 'Senior',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            data: barangays.map((barangay) => barangay.stats.senior.value),
          },
          {
            label: 'Daycare Center',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgb(255, 206, 86)',
            data: barangays.map((barangay) => barangay.stats.daycareCenter.value),
          },
          {
            label: 'PWD',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            data: barangays.map((barangay) => barangay.stats.pwd.value),
          },
        ],
      }

      chart.value = new Chart(ctx, {
        type: selectedChartType.value,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      })
    }

    const selectBarangay = (barangay) => {
      // Implement barangay selection logic here
      console.log('Selected barangay:', barangay.name)
    }

    onMounted(() => {
      renderChart()
    })

    watch(selectedChartType, () => {
      renderChart()
    })

    return {
      isCollapsed,
      searchQuery,
      navItems,
      summaryCards,
      barangays,
      filteredBarangays,
      chartCanvas,
      selectedChartType,
      selectedCategory,
      toggleSidebar,
      selectBarangay,
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
}

/* Sidebar styles (unchanged) */
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

/* Enhanced Main Content styles */
.main-content {
  flex-grow: 1;
  padding: 30px;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.main-content.expanded {
  margin-left: 80px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
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
  padding: 10px 10px 10px 35px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  width: 250px;
  transition: all 0.3s ease;
}

.search-input:focus {
  width: 300px;
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.refresh-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.refresh-button:hover {
  background-color: #45a049;
}

.refresh-button svg {
  margin-right: 8px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.summary-cards {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.summary-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.card-icon {
  color: #4CAF50;
  margin-right: 20px;
}

.card-content {
  flex-grow: 1;
}

.card-title {
  font-size: 16px;
  color: #757575;
  margin: 0 0 5px;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.chart-container {
  grid-column: 1 / 3;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-type-select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: white;
  cursor: pointer;
}

.barangay-list-container {
  grid-column: 3 / -1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.barangay-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.category-filter {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: white;
  cursor: pointer;
}

.export-btn {
  display: flex;
  align-items: center;
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
  font-weight: 600;
}

.export-btn:hover {
  background-color: #1976D2;
}

.export-btn svg {
  margin-right: 5px;
}

.barangay-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.barangay-item {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.barangay-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.barangay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.barangay-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.barangay-arrow {
  color: #757575;
}

.barangay-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.stat-item {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
}

.stat-item svg {
  margin-right: 5px;
}

.soloParent { background-color: #FF7043; }
.senior { background-color: #42A5F5; }
.daycareCenter { background-color: #FFCA28; color: #333; }
.pwd { background-color: #66BB6A; }

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .chart-container, .barangay-list-container {
    grid-column: auto;
  }
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
    padding: 20px;
  }

  .main-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 20px;
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

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .chart-container, .barangay-list-container {
    height: auto;
    max-height: none;
  }

  .barangay-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .category-filter, .export-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>