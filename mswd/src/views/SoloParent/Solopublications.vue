<template>        <nav class="navbar">  <div class="navbar-brand">
  <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />

  <span class="brand-text">Welcome to Solo Parent!</span>
</div>
<div class="navbar-links">
  <router-link to="/SoloTemplate" class="nav-link">Home</router-link>
  <br>
  <router-link to="/Soloparent" class="nav-link">Assistance</router-link>
  <router-link to="/SoloEvents" class="nav-link">Upcoming Events</router-link>
  <router-link to="/SoloServices" class="nav-link">Services</router-link>
  <router-link to="/Solopublications" class="nav-link">Publications</router-link>
  <button class="logout-button" @click="logout">Sign Out</button>

</div>
</nav>
  <div class="spacer"></div>
  <main class="main-content">
    <div class="publications-container">
      <h2>Publications</h2>
      <ul class="publication-list">
        <li v-for="publication in publications" :key="publication.id" class="publication-item">
          <h3>{{ publication.title }}</h3>
          <p class="publication-date"><strong>Date:</strong> {{ publication.date }}</p>
          <p class="publication-description">{{ publication.description }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Publications',
  data() {
    return {
      publications: [
        { id: 1, title: 'Annual Report 2023', date: 'January 1, 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
        { id: 2, title: 'Monthly Newsletter - March 2024', date: 'March 15, 2024', description: 'Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.' },
        { id: 3, title: 'Guide to Social Welfare Programs', date: 'April 5, 2024', description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.' },
        // Add more publications as needed
      ],
    };
  },
  methods: {logout() {
        // Perform logout actions (e.g., clear session, redirect to login page)
        // You need to replace '/login' with the correct path to your login page
        this.$router.push('/');
      },
    },
};
</script>

<style scoped>
.spacer {
  height: 100px; /* Adjust the height for desired spacing */
}

.publications-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px; /* Adjusted padding for better layout */
  background-color: #f5f5f5; /* Light background for better contrast */
  border-radius: 5px; /* Added subtle border radius */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
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

/* Added styles for main container */
.main-content {
  padding-top: 20px; /* Added some space after the navbar */
}
.navbar {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.navbar-brand {
  font-size: 24px;
}

.navbar-links {
  margin-left: auto;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
}

.logout-button {
  background-color: #ff5f5f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff3333;
}
</style>
