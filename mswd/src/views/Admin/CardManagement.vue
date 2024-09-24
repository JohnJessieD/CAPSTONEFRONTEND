<template>
  <div>
    <AdminNav />
    <div class="spacer"></div>
    <h2>User Card Management</h2>

    <div v-if="isLoading">
      <div class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading user data...</p>
      </div>
    </div>

    <div v-else class="user-cards">
      <div v-for="(user, index) in users" :key="index" class="user-card">
        <h3>{{ user.username }}</h3>
        <p v-if="user.requirements">Requirements: {{ user.requirements }}</p>
        <p>Category: {{ user.category }}</p>
        <p v-if="user.certificate">Certificate: {{ user.certificate }}</p>
        <button @click="printUser(user)">Print User Card</button> <!-- Button to print user card -->
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from './AdminNav.vue';
import axios from 'axios'; // Assuming you're fetching user data from an API

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      isLoading: true, // Initially set loading to true
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users'); // Adjust the API endpoint
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.isLoading = false; // Set loading to false after fetching or on error
      }
    },
    printUser(user) {
      // Create a string with user details
      const userCard = `
        Username: ${user.username}
        ${user.requirements ? 'Requirements: ' + user.requirements : ''}
        Date of Birth: ${user.dob}
        Category: ${user.category}
        ${user.certificate ? 'Certificate: ' + user.certificate : ''}
      `;

      // Create a new window and print the user card
      const printWindow = window.open('', '_blank');
      printWindow.document.write(userCard);
      printWindow.document.close();
      printWindow.print();
    },
  },
};
</script>

  
  <style scoped>
  /* Same styles from previous response */
  .spacer {
    height: 100px; /* Adjust the height for desired spacing */
  }
  
  .user-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px; /* Adjust the margin-bottom for desired spacing */
  }
  
  /* Add loading styles from previous response */
  .loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
    z-index: 10; /* Ensure overlay appears on top of content */
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #fff;
    border-radius: 50%;
    border-top-color: #3498db; /* Animated spinner color */
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .user-card {
  border: 1px solid #000;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin-top: 0;
}

.user-card p {
  margin: 10px 0;
}

/* Additional styles for better printing */
body {
  font-family: Arial, sans-serif;
}

@media print {
  /* Hide AdminNav and loading overlay */
  .AdminNav,
  .loading-overlay {
    display: none;
  }
}
  </style>
    