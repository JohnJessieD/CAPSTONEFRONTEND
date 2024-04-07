
<template>
   <AdminNav />
<div class="dashboard">
 
    <h1>Dashboard</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search barangay..." class="search-input">
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <ul class="barangay-list">
      <li v-for="barangay in filteredBarangays" :key="barangay.id" class="barangay-item">
        {{ barangay.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import AdminNav from './AdminNav.vue';

export default {
  name: 'Dashboard',
  components: {
    AdminNav
  },
  data() {
    return {
      searchQuery: '',
      barangays: [
        { id: 1, name: 'Barangay A', soloParent: 10, senior: 20, daycareCenter: 15, pwd: 5 },
        { id: 2, name: 'Barangay B', soloParent: 8, senior: 15, daycareCenter: 20, pwd: 3 },
        // Add more barangays data here
      ]
    };
  },
  computed: {
    filteredBarangays() {
      return this.barangays.filter(barangay => {
        return barangay.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.barangays.map(barangay => barangay.name),
          datasets: [
            {
              label: 'Solo Parent',
              backgroundColor: '#FF6384',
              borderColor: '#FF6384',
              borderWidth: 1,
              data: this.barangays.map(barangay => barangay.soloParent)
            },
            {
              label: 'Senior',
              backgroundColor: '#36A2EB',
              borderColor: '#36A2EB',
              borderWidth: 1,
              data: this.barangays.map(barangay => barangay.senior)
            },
            {
              label: 'Daycare Center',
              backgroundColor: '#FFCE56',
              borderColor: '#FFCE56',
              borderWidth: 1,
              data: this.barangays.map(barangay => barangay.daycareCenter)
            },
            {
              label: 'PWD',
              backgroundColor: '#4BC0C0',
              borderColor: '#4BC0C0',
              borderWidth: 1,
              data: this.barangays.map(barangay => barangay.pwd)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.chart-container {
  margin-bottom: 20px;
}

.barangay-list {
  list-style: none;
  padding: 0;
}

.barangay-item {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.barangay-item:hover {
  background-color: #e0e0e0;
}
</style>
