<template>
  <div>
    <Navbar />
    <h2>Services</h2>
    <ul>
      <li v-for="service in services" :key="service.id">
        {{ service.name }} - {{ service.description }}
      </li>
    </ul>

    <div>
      <h3>Service Updates and News</h3>
      <ul>
        <li v-for="update in serviceUpdates" :key="update.id">
          {{ update.title }} - {{ update.date }}
          <p>{{ update.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name: 'Services',
  components: {
    Navbar,
  },
  data() {
    return {
      services: [],
      serviceUpdates: [],
    };
  },
  created() {
    this.fetchServices();
    this.fetchServiceUpdates();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get('URL_TO_YOUR_SERVICES_ENDPOINT');
        this.services = response.data; // Assuming your API returns an array of services
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    async fetchServiceUpdates() {
      try {
        const response = await axios.get('URL_TO_YOUR_SERVICE_UPDATES_ENDPOINT');
        this.serviceUpdates = response.data; // Assuming your API returns an array of service updates
      } catch (error) {
        console.error('Error fetching service updates:', error);
      }
    },
  },
};
</script>



<style scoped>
/* Add your styles here */
</style>
