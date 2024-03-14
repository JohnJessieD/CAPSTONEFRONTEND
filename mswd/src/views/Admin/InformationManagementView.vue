<template>
    <div class="container">
      <AdminNav />
      <h1 class="heading">Information Management</h1>
  
      <div class="section">
        <h2 class="section-heading">Database Information</h2>
        <div v-if="databaseInfo.length === 0" class="info-message">No information available</div>
        <div v-else>
          <ul class="info-list">
            <li v-for="info in databaseInfo" :key="info.id" class="info-item">{{ info.name }} - {{ info.category }}</li>
          </ul>
        </div>
      </div>
  
      <div class="section">
        <h2 class="section-heading">Add Information</h2>
        <form @submit.prevent="addInformation" class="form">
          <label class="form-label">Name:</label>
          <input type="text" v-model="newInfo.name" required class="form-input">
          <label class="form-label">Category:</label>
          <select v-model="newInfo.category" required class="form-select">
            <option v-for="option in categories" :value="option" :key="option">{{ option }}</option>
          </select>
          <button type="submit" class="btn">Add Information</button>
        </form>
      </div>
  
      <div class="section">
        <h2 class="section-heading">Active Counts</h2>
        <canvas ref="chartCanvas" class="chart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  import AdminNav from './AdminNav.vue';
  
  export default {
    name: 'InformationManagement',
    components: { AdminNav },
    data() {
      return {
        databaseInfo: [
          { id: 1, name: 'John Doe', category: 'Solo Parent' },
          { id: 2, name: 'Jane Doe', category: 'PWD' },
          // Add more database information here
        ],
        newInfo: {
          name: '',
          category: 'Solo Parent'
        },
        categories: ['Solo Parent', 'PWD', 'Daycare Worker', 'Senior Citizen']
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      addInformation() {
        // Implement logic to add new information to database
        this.databaseInfo.push({ id: this.databaseInfo.length + 1, ...this.newInfo });
        this.newInfo.name = '';
        this.newInfo.category = 'Solo Parent';
        this.renderChart();
      },
      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.categories,
            datasets: [{
              label: 'Active Counts',
              data: this.categories.map(category => this.countActive(category)),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
      },
      countActive(category) {
        return this.databaseInfo.filter(info => info.category === category).length;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .heading {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .section {
    margin-bottom: 30px;
  }
  
  .section-heading {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .info-message {
    font-style: italic;
    color: #777;
  }
  
  .info-list {
    list-style: none;
    padding: 0;
  }
  
  .info-item {
    margin-bottom: 5px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-input,
  .form-select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chart {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  </style>
  