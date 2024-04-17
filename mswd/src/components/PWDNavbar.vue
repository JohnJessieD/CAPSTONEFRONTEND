<template>
    <nav class="navbar">  <div class="navbar-brand">
          <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
          <span class="brand-text">Welcome to Municipal SWD!</span>
        </div>
        <div class="navbar-links">
          <router-link to="/PWDNavbar" class="nav-link">Home</router-link>
          <br>
          <router-link to="/AssistancePWD" class="nav-link">Assistance</router-link>
          <router-link to="/Events" class="nav-link">Upcoming Events</router-link>
          <router-link to="/Services" class="nav-link">Services</router-link>
          <router-link to="/publications" class="nav-link">Publications</router-link>
          <router-link to="/contacts" class="nav-link">Contact Us</router-link>
          <button class="logout-button" @click="logout">Sign Out</button>
        
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
  </script><style scoped>.navbar {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem; /* Adjusted padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 1024px;
  margin: 0 auto; /* Center the navbar horizontally */
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
}

.logo-img {
  width: 50px;
  margin-right: 0.5rem; /* Adjusted margin */
}

.brand-text {
  font-family: 'Poppins', sans-serif;
}

.navbar-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1rem; /* Adjusted padding */
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.logout-button {
  background-color: #fff;
  color: #333;
  border: none;
  padding: 0.8rem 1rem; /* Adjusted padding */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #e0e0e0;
} 


  </style>
