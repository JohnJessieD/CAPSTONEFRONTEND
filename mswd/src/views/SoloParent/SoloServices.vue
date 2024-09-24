<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
      <span class="brand-text">Welcome to Solo Parent!</span>
    </div>
    <div class="navbar-links">
      <router-link to="/SoloTemplate" class="nav-link">Home</router-link>
      <router-link to="/Soloparent" class="nav-link">Assistance</router-link>
      <router-link to="/SoloEvents" class="nav-link">Upcoming Events</router-link>
      <router-link to="/SoloServices" class="nav-link">Services</router-link>
      <router-link to="/Solopublications" class="nav-link">Publications</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>
  </nav>
  <div class="spacer"></div>
  <div class="container">
    <!-- Services section -->
    <div class="section">
      <h2>Our Services</h2>
      <ul class="card-list">
        <li v-for="service in services" :key="service.id" class="card">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </li>
      </ul>
    </div>
    <!-- Service Updates section -->
    <div class="section">
      <h2>Service Updates and News</h2>
      <ul class="card-list">
        <li v-for="update in serviceUpdates" :key="update.id" class="card">
          <h3>{{ update.title }}</h3>
          <p><strong>Date:</strong> {{ update.date }}</p>
          <p>{{ update.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
        { id: 1, name: 'Counselling Services', description: 'Provides counseling and support for individuals and families in need.' },
        { id: 2, name: 'Community Outreach Programs', description: 'Organizes programs to engage with communities and provide assistance.' },
        { id: 3, name: 'Food Distribution', description: 'Coordinates distribution of food aid to disadvantaged groups.' }
      ],
      serviceUpdates: [
        { id: 1, title: 'New Counseling Hours', date: '2024-04-08', description: 'Starting from next week, counseling services will be available from 9:00 AM to 5:00 PM on weekdays.' },
        { id: 2, title: 'Community Health Seminar', date: '2024-04-07', description: 'A health seminar will be conducted in collaboration with local health authorities on April 15th at the community center.' },
        { id: 3, title: 'Expansion of Food Distribution Program', date: '2024-04-06', description: 'Due to increased demand, we are expanding our food distribution program to cover additional areas. Volunteers are needed.' }
      ]
    };
  },
  methods: {
    logout() {
      // Perform logout actions (e.g., clear session, redirect to login page)
      // You need to replace '/login' with the correct path to your login page
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.spacer {
    height: 100px; /* Adjust the height for desired spacing */
  }
h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.card-list {
  list-style: none;
  padding: 0;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
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
