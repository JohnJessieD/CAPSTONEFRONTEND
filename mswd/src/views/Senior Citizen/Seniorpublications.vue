<template>
    <div class="publications-container">
      <h2>Publications</h2>
      <ul class="publication-list">
        <li v-for="publication in publications" :key="publication.id" class="publication-item">
          <h3>{{ publication.title }}</h3>
          <p class="publication-date"><strong>Date:</strong> {{ publication.date }}</p>
          <p class="publication-description">{{ publication.description }}</p>
          <!-- Add download button or link if applicable -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import axios from 'axios';
  
  export default {
   
    name: 'Publications',
    data() {
      return {
        publications: [
          { id: 1, title: 'Annual Report 2023', date: 'January 1, 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
          // Add more publications as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .publications-container {
    max-width: 800px;
    margin: 0 auto;
    padding:150px;
  }
  
  .publication-list {
    list-style-type: none;
    padding: 0;
  }
  
  .publication-item {
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    transition: all 0.3s ease;
  }
  
  .publication-item:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .publication-item h3 {
    margin-top: 0;
  }
  
  .publication-date {
    color: #666;
  }
  
  .publication-description {
    margin-top: 10px;
  }
  </style>
  