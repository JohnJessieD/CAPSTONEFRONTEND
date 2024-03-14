<template>
    <div>
      <button @click="toggleSidebar" class="toggle-btn">☰</button>
      <nav class="sidebar" :class="{ 'open': isOpen }">
        <div class="sidebar-header">
          <span>Admin Panel</span>
        </div>
        <ul class="nav-links">
          <li><router-link to="/Dashboard" exact>📊Dashboard</router-link></li>
          <li><router-link to="/profile-entry">👤Profile Entry</router-link></li>
          <li><router-link to="/form-management">📝Form Management</router-link></li>
          <li><router-link to="/information-management">ℹ️Information Management</router-link></li>
          <li><router-link to="/user-management">👥User Management</router-link></li>
          <button class="logout-button" @click="logout">Logout</button> <!-- New logout button -->
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      // Perform logout functionality
      // For example, clear session, remove tokens, etc.
      
      // Redirect to the login page
      this.$router.push('/Login');
    }
  }
};
</script>

  <style>
  .sidebar {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: -250px; /* Initially hide the sidebar */
    background-color: #333;
    color: #fff;
    font-family: Arial, sans-serif;
    transition: left 0.3s ease; /* Added transition for smooth animation */
  }
  
  .sidebar.open {
    left: 0; /* Show the sidebar when isOpen is true */
  }
  
  .sidebar-header {
    padding: 20px;
    text-align: center;
    font-size: 1.5rem;
    border-bottom: 1px solid #555;
  }
  
  .nav-links {
    list-style-type: none;
    padding: 0;
  }
  
  .nav-links li {
    padding: 10px 20px;
    border-bottom: 1px solid #555;
    transition: background-color 0.3s ease;
  }
  
  .nav-links li:last-child {
    border-bottom: none;
  }
  
  .nav-links li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .nav-links li a:hover {
    background-color: #555;
    color: #ffcc00;
  }
  
  .toggle-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999; /* Ensure button is on top of sidebar */
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  </style>
  