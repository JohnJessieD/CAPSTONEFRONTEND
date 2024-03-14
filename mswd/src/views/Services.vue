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
      <h3>Add New Service</h3>
      <form @submit.prevent="addService">
        <label>Name:</label>
        <input v-model="newService.name" required />
        <label>Description:</label>
        <input v-model="newService.description" required />
        <button type="submit">Add Service</button>
      </form>
    </div>

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

export default {
  name: 'Services',
  components: {
    Navbar,
  },
  data() {
    return {
      services: [],
      newService: {
        name: '',
        description: '',
      },
      serviceUpdates: [ // Sample data for demonstration
        {
          id: 1,
          title: 'New Service Offering',
          date: '2024-02-28',
          description: 'We are excited to announce the launch of our new service aimed at facilitating small businesses...',
        },
        {
          id: 2,
          title: 'Important Update: Changes to Permit Processing',
          date: '2024-02-25',
          description: 'Please be advised that there will be changes to the permit processing timelines starting next month...',
        },
        // Add more service updates as needed
      ],
    };
  },
  methods: {
    addService() {
      const service = { id: this.services.length + 1, ...this.newService };
      this.services.push(service);
      this.newService = { name: '', description: '' };
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
