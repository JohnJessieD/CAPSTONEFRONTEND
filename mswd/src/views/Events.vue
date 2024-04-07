<template>
     <Navbar />
  <div class="admin-events">
 
    <h1 class="title">MSWD Events</h1>
    <ul v-if="adminEvents.length" class="event-list">
      <li v-for="event in adminEvents" :key="event.id" class="event-item">
        <h2 class="event-title">{{ event.title }}</h2>
        <p class="event-description">{{ event.description }}</p>
        <p class="event-date">Date: {{ event.date }}</p>
        <p class="event-location">Location: {{ event.location }}</p>
      </li>
    </ul>
    <p v-else class="no-events">No events found.</p>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';

export default {
  components: {
    Navbar,
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
  }
};
</script>

<style scoped>
.admin-events {
  max-width: 800px;
  margin: 0 auto;
  padding: 190px;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.event-list {
  list-style: none;
  padding: 0;
}

.event-item {
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-title {
  font-size: 22px;
  margin-bottom: 10px;
}

.event-description {
  font-size: 18px;
  color: #333;
}

.event-date,
.event-location {
  font-size: 16px;
  color: #666;
}

.no-events {
  text-align: center;
  color: #888;
  font-size: 18px;
  margin-top: 40px;
}
</style>
