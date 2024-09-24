<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/placeholder.svg?height=50&width=50" alt="MSWD Logo" class="logo">
        <h1 class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
          <a href="#" class="nav-link active">
            <i class="fas fa-chart-line"></i> <span>Dashboard</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-users"></i> <span>Users</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-file-alt"></i> <span>Reports</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-cog"></i> <span>Settings</span>
          </a>
      </nav>
      <div class="user-info">
        <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" class="user-avatar">
        <span class="user-name">Admin User</span>
        <button class="logout-button">
          <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="main-header">
        <h2 class="page-title">Barangay Dashboard</h2>
        <div class="header-actions">
          <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Barangay..."
              class="search-input"
            />
          </div>
          <button class="refresh-button">
            <i class="fas fa-sync-alt"></i> Refresh Data
          </button>
        </div>
      </header>

      <div class="dashboard-grid">
        <div class="summary-cards">
          <div class="summary-card">
            <i class="fas fa-map-marker-alt card-icon"></i>
            <h4 class="card-title">Total Barangays</h4>
            <p class="card-value">{{ barangays.length }}</p>
          </div>
          <div class="summary-card">
            <i class="fas fa-user card-icon"></i>
            <h4 class="card-title">Total Solo Parents</h4>
            <p class="card-value">{{ totalSoloParents }}</p>
          </div>
          <div class="summary-card">
            <i class="fas fa-user-friends card-icon"></i>
            <h4 class="card-title">Total Seniors</h4>
            <p class="card-value">{{ totalSeniors }}</p>
          </div>
          <div class="summary-card">
            <i class="fas fa-wheelchair card-icon"></i>
            <h4 class="card-title">Total PWDs</h4>
            <p class="card-value">{{ totalPWDs }}</p>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="section-title">Barangay Statistics</h3>
          <canvas ref="chartCanvas"></canvas>
        </div>

        <div class="barangay-list-container">
          <h3 class="section-title">Barangay List</h3>
          <ul class="barangay-list">
            <li
              v-for="barangay in filteredBarangays"
              :key="barangay.id"
              class="barangay-item"
              @click="selectBarangay(barangay)"
            >
              <span class="barangay-name">{{ barangay.name }}</span>
              <div class="barangay-stats">
                <span class="stat-item solo-parent">
                  <i class="fas fa-user"></i> {{ barangay.soloParent }}
                </span>
                <span class="stat-item senior">
                  <i class="fas fa-user-friends"></i> {{ barangay.senior }}
                </span>
                <span class="stat-item daycare">
                  <i class="fas fa-baby"></i> {{ barangay.daycareCenter }}
                </span>
                <span class="stat-item pwd">
                  <i class="fas fa-wheelchair"></i> {{ barangay.pwd }}
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
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
  data() {
    return {
      searchQuery: '',
      barangays: [
        { id: 1, name: 'Barangay Ilag', soloParent: 10, senior: 20, daycareCenter: 15, pwd: 5 },
        { id: 2, name: 'Barangay Poblacion', soloParent: 8, senior: 15, daycareCenter: 20, pwd: 3 },
        { id: 3, name: 'Bigaan', soloParent: 20, senior: 50, daycareCenter: 30, pwd: 10 },
        { id: 4, name: 'San Antonio', soloParent: 15, senior: 30, daycareCenter: 25, pwd: 8 },
        { id: 5, name: 'Santa Cruz', soloParent: 12, senior: 40, daycareCenter: 18, pwd: 6 },
      ],
      chart: null,
    };
  },
  computed: {
    filteredBarangays() {
      return this.barangays.filter((barangay) => {
        return barangay.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    totalSoloParents() {
      return this.barangays.reduce((total, barangay) => total + barangay.soloParent, 0);
    },
    totalSeniors() {
      return this.barangays.reduce((total, barangay) => total + barangay.senior, 0);
    },
    totalPWDs() {
      return this.barangays.reduce((total, barangay) => total + barangay.pwd, 0);
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.barangays.map((barangay) => barangay.name),
          datasets: [
            {
              label: 'Solo Parent',
              backgroundColor: '#F7CAC9',
              borderColor: '#F7CAC9',
              borderWidth: 1,
              data: this.barangays.map((barangay) => barangay.soloParent),
            },
            {
              label: 'Senior',
              backgroundColor: '#90CAF9',
              borderColor: '#90CAF9',
              borderWidth: 1,
              data: this.barangays.map((barangay) => barangay.senior),
            },
            {
              label: 'Daycare Center',
              backgroundColor: '#FFEBEE',
              borderColor: '#FFEBEE',
              borderWidth: 1,
              data: this.barangays.map((barangay) => barangay.daycareCenter),
            },
            {
              label: 'PWD',
              backgroundColor: '#C5CAE9',
              borderColor: '#C5CAE9',
              borderWidth: 1,
              data: this.barangays.map((barangay) => barangay.pwd),
            },
          ],
        },
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
      });
    },
    selectBarangay(barangay) {
      this.chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = this.barangays.map((b) =>
          b.id === barangay.id ? '#FFD700' : dataset.borderColor
        );
      });
      this.chart.update();
    },
  },
};
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
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
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

.logout-button i {
  margin-right: 5px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
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

.refresh-button i {
  margin-right: 5px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.summary-cards {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.summary-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 10px;
}

.card-title {
  font-size: 16px;
  color: #757575;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
}

.chart-container {
  grid-column: 1 / 3;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.barangay-list-container {
  grid-column: 3 / -1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
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

.barangay-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
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

.stat-item i {
  margin-right: 5px;
}

.solo-parent { background-color: #F7CAC9; }
.senior { background-color: #90CAF9; }
.daycare { background-color: #FFEBEE; color: #333; }
.pwd { background-color: #C5CAE9; }

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

  .logout-button i {
    margin-right: 0;
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

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .chart-container, .barangay-list-container {
    height: auto;
    max-height: none;
  }
}
</style>