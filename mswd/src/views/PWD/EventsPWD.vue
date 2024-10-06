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
    <main class="main-content">
      <h1 class="title">MSWD Events</h1>
      <ul v-if="adminEvents.length" class="event-list">
        <li v-for="event in adminEvents" :key="event.id" class="event-item">
          <div class="event-image"></div>
          <div class="event-content">
            <h2 class="event-title">{{ event.title }}</h2>
            <p class="event-description">{{ event.description }}</p>
            <div class="event-details">
              <span class="event-date">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Date: {{ event.date }}
              </span>
              <span class="event-location">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Location: {{ event.location }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="no-events">No events found.</p>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminEvents: [
        {
          id: 1,
          title: 'Community Outreach Program',
          description: 'Join us for a community outreach program aimed at providing assistance to marginalized families in need.',
          date: 'April 15, 2024',
          location: 'Barangay Poblacion, San Teodoro, Oriental Mindoro'
        },
        {
          id: 2,
          title: 'Disaster Preparedness Seminar',
          description: 'Attend our disaster preparedness seminar to learn essential skills for managing and responding to emergencies effectively.',
          date: 'May 5, 2024',
          location: 'MSWD Office, San Teodoro, Oriental Mindoro'
        },
        {
          id: 3,
          title: 'Senior Citizens Health Fair',
          description: 'Participate in our health fair dedicated to senior citizens, featuring free health screenings and informational sessions.',
          date: 'June 10, 2024',
          location: 'San Teodoro Municipal Hall, Oriental Mindoro'
        },
        {
          id: 4,
          title: 'Youth Leadership Workshop',
          description: 'Empower the youth by joining our leadership workshop, focusing on skills development and community engagement.',
          date: 'July 20, 2024',
          location: 'MSWD Office, San Teodoro, Oriental Mindoro'
        },
        {
          id: 5,
          title: 'Women Empowerment Conference',
          description: 'Celebrate women empowerment with us through informative talks, workshops, and networking opportunities.',
          date: 'August 30, 2024',
          location: 'San Teodoro Community Center, Oriental Mindoro'
        }
      ]
    };
  },
  methods: {
    logout() {
      // Implement logout logic here
      this.$router.push('/');
    }
  }
};
</script>


<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  margin-top: 80px; /* Add margin to push content below fixed navbar */
  flex-grow: 1;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  color: #004d7a;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.event-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.event-image {
  height: 150px;
  background-color: #e0e0e0;
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.event-content {
  padding: 1.5rem;
}

.event-title {
  font-size: 1.5rem;
  color: #004d7a;
  margin-bottom: 0.5rem;
}

.event-description {
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.event-date,
.event-location {
  display: flex;
  align-items: center;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
}

.no-events {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
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

  .title {
    font-size: 2rem;
  }

  .event-list {
    grid-template-columns: 1fr;
  }

  .main-content {
    margin-top: 160px; /* Increase top margin for mobile to accommodate larger navbar */
  }
}
</style>