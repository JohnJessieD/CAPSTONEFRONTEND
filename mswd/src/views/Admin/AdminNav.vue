<!-- App.vue -->
<template>
    <div id="app">
      <AdminNav />
      <router-view />
    </div>
  </template>
  
  <script>
  import AdminNav from '@/components/AdminNav.vue';
  
  export default {
    name: 'App',
    components: {
      AdminNav,
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
  