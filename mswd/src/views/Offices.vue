<template>
  <div>
    <Navbar />
    <div class="page-container">
      <div class="office-container">
        <div class="office-list">
          <div class="office-card" v-for="(office, index) in offices" :key="index">
            <div class="office-header">
              <h3>{{ office.name }}</h3>
            </div>
            <div class="office-body">
              <img :src="office.image" alt="Office Image" class="office-image" />
              <p>{{ office.description }}</p>
            </div>
            <div class="office-footer">
              <button @click="goToRouterLink(office.routerPath)">Visit Office</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Offices',
  components: {
    Navbar,
  },
  data() {
    return {
      offices: [
        { 
          name: 'PWD Office', 
          routerPath: '/Pwd', 
          description: 'Providing support and services for Persons with Disabilities (PWD).',
        ///  image: require('@/assets/pwd_office_image.jpg') // Import image for PWD Office
        },
        { 
          name: 'Solo Parent Office', 
          routerPath: '/Soloparent', 
          description: 'Assisting single parents in accessing necessary resources and assistance.',
         /// image: require('@/assets/solo_parent_office_image.jpg') // Import image for Solo Parent Office
        },
        { 
          name: 'Needy Adult Office', 
          routerPath: '/Needyadults', 
          description: 'Offering assistance and resources to adults in need within the community.',
        //  image: require('@/assets/needy_adult_office_image.jpg') // Import image for Needy Adult Office
        },
        { 
          name: 'Disaster Victims Office', 
          routerPath: '/Disastervictims', 
          description: 'Assisting and supporting individuals affected by disasters in the community.',
         // image: require('@/assets/disaster_victims_office_image.jpg') // Import image for Disaster Victims Office
        },
      ],
    };
  },
  methods: {
    goToRouterLink(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.page-container {
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.office-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}

.office-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.office-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.office-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.office-header {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.office-body {
  padding: 20px;
  color: #444;
}

.office-footer {
  padding: 20px;
  text-align: center;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.office-image {
  width: 100%;
  max-height: 200px; /* Set maximum height for image */
  object-fit: cover; /* Maintain aspect ratio and cover the entire container */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
