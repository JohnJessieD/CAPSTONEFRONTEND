<template>
  <nav class="navbar">
    <div class="container">  <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/offices" class="nav-link">Meet Our Departments</router-link>
        <router-link to="/Events" class="nav-link">Upcoming Events</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/publications" class="nav-link">Publications</router-link>
        <router-link to="/contacts" class="nav-link">Contact Us</router-link>
        <button class="logout-button" @click="logout">Sign Out</button>
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
</script><style scoped>
/* Modern and Minimalist Navbar Styling */

.navbar {
  background-color: #fff; /* Clean white background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 1rem; /* Consistent padding */
  display: flex;
  justify-content: space-between; /* Align items horizontally */
  align-items: center; /* Align items vertically */
}

.container {
  max-width: 1024px; /* Adjust for your content width */
  margin: 0 auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: #333; /* Dark text for contrast */
  font-size: 1.2rem; /* Adjust font size as needed */
  text-decoration: none;
}

.logo-img {
  width: 50px; /* Adjust logo size */
  margin-right: 1rem; /* Use rem for spacing consistency */
}

.brand-text {
  font-family: 'Poppins', sans-serif; /* Modern and clean font */
}

.navbar-links {
  display: flex;
  list-style: none; /* Remove default list styling */
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500; /* Medium font weight */
  padding: 0.8rem 1.2rem; /* Consistent spacing */
  border-radius: 4px; /* Subtle border */
  transition: background-color 0.2s ease-in-out;
  cursor: pointer; /* Indicate interactivity */
}

.nav-link:hover {
  background-color: #f5f5f5; /* Light hover effect */
}

.logout-button {
  background-color: #fff; /* White background for logout button */
  color: #333; /* Dark text for logout button */
  border: none;
  padding: 0.8rem 1.2rem; /* Consistent spacing */
  border-radius: 4px;
  cursor: pointer; /* Indicate interactivity */
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #e0e0e0; /* Light gray on hover */
}
</style>
