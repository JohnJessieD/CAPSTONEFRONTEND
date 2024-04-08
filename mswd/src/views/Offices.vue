<template>
  <div>
    <Navbar />
    <div class="page-container">
      <div class="office-container">
        <div class="office-list">
          <div class="office-card" v-for="(office, index) in offices" :key="index">
            <div class="office-header">
              <h3>{{ office.name }}</h3>
              <h3>{{ office.icon }}</h3>
            </div>
            <div class="office-body">
            
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
    return{
  offices: [
    { 
      name: 'PWD Office', 
      routerPath: '/Pwd', 
      description: 'Providing support and services for Persons with Disabilities (PWD).',
      icon: '♿' // Unicode character for wheelchair icon
    },
    { 
      name: 'Solo Parent Office', 
      routerPath: '/Soloparent', 
      description: 'Assisting single parents in accessing necessary resources and assistance.',
      icon: '👨‍👩‍👦' // Unicode character for family icon
    },
    { 
      name: 'Needy Adult Office', 
      routerPath: '/Needyadults', 
      description: 'Offering assistance and resources to adults in need within the community.',
      icon: '❤️' // Unicode character for heart icon
    },
    {
      name: 'Daycare Workers Support Office',
      routerPath: '/Disastervictims',
      description: 'Providing assistance and support to daycare workers in the community.',
      icon: '👶' // Unicode character for baby icon
    }
  ]
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
  padding:120px;
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
