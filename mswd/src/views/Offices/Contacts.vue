<template>
    <div>
        <Navbar />
      <h2>Contact Us</h2>
      <div class="contact-info">
        <p><strong>Phone:</strong> {{ phone }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      Navbar,
    },
    name: 'ContactUs',
    data() {
      return {
        phone: '123-456-7890',
        email: 'contact@example.com',
        address: '123 Main Street, City, Country',
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  