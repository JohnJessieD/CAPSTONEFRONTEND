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
  <div class="admin-events">
    <h1 class="title">MSWD Events</h1>
    <ul v-if="adminEvents.length" class="event-list">
      <li v-for="event in adminEvents" :key="event.id" class="event-item">
        <div class="event-image"> </div> <div class="event-content">
          <h2 class="event-title">{{ event.title }}</h2>
          <p class="event-description">{{ event.description }}</p>
          <div class="event-details">
            <span class="event-date">
              <i class="fas fa-calendar-alt"></i> Date: {{ event.date }}
            </span>
            <span class="event-location">
              <i class="fas fa-map-marker-alt"></i> Location: {{ event.location }}
            </span>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="no-events">No events found.</p>
  </div>
</template>
<script>
import Navbar from '@/views/Navbar.vue';

export default {
  components: {
    Navbar
  },
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
      // Perform logout actions (e.g., clear session, redirect to login page)
      // You need to replace '/login' with the correct path to your login page
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>.spacer {
  height: 100px; /* Adjust the height for desired spacing */
}
.admin-events {
  max-width: 1000px; /* Adjust width for responsiveness */
  margin: 0 auto;
  padding: 40px; /* Reduced padding for a more compact look */
  background-color: #f5f5f5; /* Subtle background color */
}

.title {
  text-align: center;
  font-size: 28px; /* Increased font size for emphasis */
  margin-bottom: 20px;
}

.event-list {
  list-style: none;
  padding: 0;
}

.event-item {
  background-color: #fff; /* White background for event items */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* Added flexbox for layout */
}

.event-image {
  flex: 0 0 120px; /* Fixed width for image (optional) */
  margin-right: 20px; /* Spacing between image and content */
  background-color: #ddd; /* Placeholder background for image */
}

.event-content {
  flex: 1; /* Fills remaining space */
}

.event-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.event-description {
  font-size: 16px;
  color: #333;
}

.event-details {
  display: flex;
  flex-wrap: wrap; /* Wrap text if content overflows */
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.event-date,
.event-location {
  margin-right: 10px; /* Spacing between details */
}

.event-date i,
.event-location i {
  margin-right: 5px; /* Spacing between icon and text */
}

.no-events {
  text-align: center;
  color: #888;
  font-size: 18px;
  margin-top: 40px;
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