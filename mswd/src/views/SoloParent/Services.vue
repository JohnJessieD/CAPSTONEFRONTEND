<template>
    <Navbar />
  <div class="container">
  
    
    <!-- Services section -->
    <div class="services">
      <h2>Our Services</h2>
      <ul>
        <li v-for="service in services" :key="service.id">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </li>
      </ul>
    </div>

    <!-- Service Updates section -->
    <div class="updates">
      <h2>Service Updates and News</h2>
      <ul>
        <li v-for="update in serviceUpdates" :key="update.id">
          <h3>{{ update.title }}</h3>
          <p><strong>Date:</strong> {{ update.date }}</p>
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
    services: [
      { id: 1, name: 'Counselling Services', description: 'Provides counseling and support for individuals and families in need.' },
      { id: 2, name: 'Community Outreach Programs', description: 'Organizes programs to engage with communities and provide assistance.' },
      { id: 3, name: 'Food Distribution', description: 'Coordinates distribution of food aid to disadvantaged groups.' }
    ],
    serviceUpdates: [
      { id: 1, title: 'New Counseling Hours', date: '2024-04-08', description: 'Starting from next week, counseling services will be available from 9:00 AM to 5:00 PM on weekdays.' },
      { id: 2, title: 'Community Health Seminar', date: '2024-04-07', description: 'A health seminar will be conducted in collaboration with local health authorities on April 15th at the community center.' },
      { id: 3, title: 'Expansion of Food Distribution Program', date: '2024-04-06', description: 'Due to increased demand, we are expanding our food distribution program to cover additional areas. Volunteers are needed.' }
    ],
    newRules: [
      { id: 1, title: 'New Reporting Guidelines', date: '2024-04-08', description: 'All staff members are required to adhere to the updated reporting guidelines for better accountability and transparency in our operations.' },
      { id: 2, title: 'Safety Protocols for Field Work', date: '2024-04-07', description: 'Field workers must follow updated safety protocols including wearing protective gear and maintaining social distancing while interacting with the community.' },
      { id: 3, title: 'Client Confidentiality Policy', date: '2024-04-06', description: 'To ensure client privacy and trust, all staff members must strictly adhere to the confidentiality policy when handling sensitive information.' }
    ],
    newMembers: [
      { id: 1, name: 'John Doe', dateJoined: '2024-04-08', role: 'Counselor' },
      { id: 2, name: 'Jane Smith', dateJoined: '2024-04-07', role: 'Community Outreach Coordinator' },
      { id: 3, name: 'David Lee', dateJoined: '2024-04-06', role: 'Volunteer Coordinator' }
    ]
  };
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
