<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Municipal SWD Office</span>
      </div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/offices" class="nav-link">Departments</router-link>
          <router-link to="/event" class="nav-link">Events</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/publications" class="nav-link">Publications</router-link>
        <router-link to="/contacts" class="nav-link">Contact</router-link>
        <button class="logout-button" @click="logout">Logout</button> <!-- New logout button -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      // Perform logout actions (e.g., clear session, redirect to login page)
      // You need to replace '/login' with the correct path to your login page
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Add your custom styling for the navigation bar here */
.navbar {
  background: #2c3e50; /* Dark blue for a professional look */
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* Limit container width */
  margin: 0 auto; /* Center container */
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
}

.logo-img {
  width: 40px; /* Adjust the size of the logo as needed */
  margin-right: 10px;
}

.brand-text {
  font-family: 'Roboto', sans-serif; /* Use a modern font */
}

.navbar-links {
  display: flex;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.nav-link:hover {
  background-color: #34495e; /* Darker blue on hover for emphasis */
}

.logout-button {
  color: #fff;
  background-color: #e74c3c; /* Red for logout button */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-button:hover {
  background-color: #c0392b; /* Darker red on hover */
}
</style>
