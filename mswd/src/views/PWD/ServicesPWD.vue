<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
      <span class="brand-text">Welcome to Municipal SWD!</span>
    </div>
    <div class="navbar-links">
      <router-link to="/temlpatep" class="nav-link">Home</router-link>
      <br>
      <router-link to="/Pwd" class="nav-link">Assistance</router-link>
      <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
      <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
      <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
      <router-link to="/CPWD" class="nav-link">Contact Us</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>  
  </nav>
  <div class="container">
    <!-- Services section -->
    <div class="services">
      <h2>Our Services</h2>
      
        <li v-for="service in services" :key="service.id">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </li>

    </div>
    <!-- Service Updates section -->
    <div class="updates">
      <h2>Service Updates and News</h2>
        <li v-for="update in serviceUpdates" :key="update.id">
          <h3>{{ update.title }}</h3>
          <p><strong>Date:</strong> {{ update.date }}</p>
          <p>{{ update.description }}</p>
        </li>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.services, .updates {
  margin-bottom: 40px;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
