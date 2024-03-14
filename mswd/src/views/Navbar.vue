<!-- App.vue -->
<template>
    <div id="app">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
    name: 'App',
    components: {
      Navbar,
    },
  };
  </script>
  
  <style>
  /* Add your global styles here */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  #app {
    text-align: center;
  }
  </style>
  