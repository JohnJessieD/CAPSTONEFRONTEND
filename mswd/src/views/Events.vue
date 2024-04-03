<template>
    <Navbar />
  <div class="admin-events">
    <h1>Admin Events</h1>
    <ul v-if="adminEvents.length">
      <li v-for="event in adminEvents" :key="event.id" class="event-item">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
      </li>
    </ul>
    <p v-else class="no-events">No events found.</p>
  </div>
</template>
<script>
import Navbar from '@/views/Navbar.vue'; // Importing the Navbar component
import axios from 'axios'; // Importing Axios for making HTTP requests

export default {
  components: {
    Navbar, // Registering the Navbar component
  },
  data() {
    return {
      adminEvents: [], // Initializing adminEvents data property
    };
  },
  mounted() {
    this.fetchAdminEvents(); // Fetch admin events when the component is mounted
  },
  methods: {
    async fetchAdminEvents() {
      try {
        const response = await axios.get('/api/admin/events'); // Making GET request to fetch admin events
        this.adminEvents = response.data; // Setting adminEvents data property with fetched events
      } catch (error) {
        console.error('Error fetching admin events:', error);
      }
    },
  },
};
</script>
<style scoped>
.admin-events {
  /* Add styles for the overall component */
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.event-item {
  /* Styles for individual event items */
  margin-bottom: 1rem;
}

.no-events {
  /* Styles for the "no events found" message */
  text-align: center;
  color: #aaa;
}
</style>
