<template>
  <div>
    <nav class="navbar">
      <div class="navbar-header">
        <span class="navbar-brand">MSWD OFFICE</span>
      </div>
      <ul class="nav-links" :class="{ 'open': isOpen }">
        <li><router-link to="/Dashboard" exact>Dashboard</router-link></li>
        <li><router-link to="/Schedule" exact>Schedule</router-link></li>
        <li><router-link to="/AssistanceManagement" exact>Assistance Management</router-link></li>
        <li><router-link to="/CardManagement" exact>Card Management</router-link></li>
        <li><router-link class="dropdown-item" to="/reports">Reports</router-link></li>
        <li><router-link to="/user-management">User Management</router-link></li>
        <li><button class="logout-button" @click="logout">Logout</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false
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
.navbar {
  background-color: #24292e;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-header {
  display: flex;
  align-items: center;
}

.navbar-brand {
  margin-left: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-links li {
  padding: 0 15px;
}

.nav-links li a {
  color: #060606;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s ease;
}

.nav-links li a:hover::after {
  width: 100%;
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
}

.logout-button {
  background: #dc3545;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background: #c82333;
}
</style>
