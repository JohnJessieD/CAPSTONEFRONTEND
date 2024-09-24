<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
      <span class="brand-text">Welcome to Municipal SWD!</span>
    </div>
    <div class="navbar-links">
      <router-link to="/temlpatep" class="nav-link">Home</router-link>
      <router-link to="/Pwd" class="nav-link">Assistance</router-link>
      <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
      <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
      <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
      <router-link to="/Status" class="nav-link">Status</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>
  </nav>

  <div class="spacer"></div>

  <div class="content-wrapper">
    <!-- Services section -->
    <div class="services">
      <h3>Our Services</h3>
      <ul class="service-list">
        <!-- Render services from the services array -->
        <li v-for="service in services" :key="service.id" class="service-item">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </li>
      </ul>
    </div>

    <!-- Service Updates section -->
    <div class="updates">
      <h2>Service Updates and News</h2>
      <ul class="update-list">
        <li v-for="update in serviceUpdates" :key="update.id" class="update-item">
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
        { id: 1, name: 'Counseling Services', description: 'Provides counseling and support for individuals and families in need.' },
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
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns: services on the left, updates on the right */
  grid-gap: 40px; /* Space between the two sections */
  padding: 50px;
}

.spacer {
  height: 50px;
}

.service-item, .update-item {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-item:hover, .update-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 30px;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
  font-family: 'Arial', sans-serif;
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #555;
  font-family: 'Arial', sans-serif;
}

p {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
}

.service-list, .update-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.logout-button {
  background-color: #ffff;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c9302c;
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr; /* Stack sections on smaller screens */
  }
}
</style>
