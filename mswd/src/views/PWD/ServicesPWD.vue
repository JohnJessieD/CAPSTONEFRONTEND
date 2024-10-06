<template>
  <div class="app-container">
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

    <main class="main-content">
      <h1 class="page-title">MSWD Services</h1>
      
      <div class="content-wrapper">
        <!-- Services section -->
        <div class="services">
          <h2 class="section-title">Our Services</h2>
          <ul class="service-list">
            <li v-for="service in services" :key="service.id" class="service-item">
              <div class="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="service-content">
                <h3 class="service-title">{{ service.name }}</h3>
                <p class="service-description">{{ service.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Service Updates section -->
        <div class="updates">
          <h2 class="section-title">Service Updates and News</h2>
          <ul class="update-list">
            <li v-for="update in serviceUpdates" :key="update.id" class="update-item">
              <div class="update-date">{{ formatDate(update.date) }}</div>
              <h3 class="update-title">{{ update.title }}</h3>
              <p class="update-description">{{ update.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
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
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
}

.navbar {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.brand-text {
  color: #004d7a;
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #f0f4f8;
  color: #004d7a;
}

.logout-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff5252;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #004d7a;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section-title {
  font-size: 1.8rem;
  color: #004d7a;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #004d7a;
  padding-bottom: 0.5rem;
}

.service-list, .update-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.service-item, .update-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-item:hover, .update-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.service-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
}

.service-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.icon {
  width: 30px;
  height: 30px;
  color: #004d7a;
}

.service-content {
  flex-grow: 1;
}

.service-title {
  font-size: 1.2rem;
  color: #004d7a;
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.update-item {
  padding: 1.5rem;
}

.update-date {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.update-title {
  font-size: 1.2rem;
  color: #004d7a;
  margin-bottom: 0.5rem;
}

.update-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    margin-bottom: 0.5rem;
  }
  .spacer {
  width: 100%;
  height: 20px; /* Default height for desktop */
}

@media (max-width: 768px) {
  .spacer {
    height: 10px; /* Reduced height for mobile */
  }
}


  .page-title {
    font-size: 2rem;
  }
}
</style>