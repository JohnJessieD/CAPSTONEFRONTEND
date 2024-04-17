<!-- App.vue -->
<template>
    <div id="app">
      <PWDNavbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import PWDNavbar from '@/components/PWDNavbar.vue';
  
  export default {
    name: 'App',
    components: {
      PWDNavbar,
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
  