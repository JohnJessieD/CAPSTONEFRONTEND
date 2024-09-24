<template> 
<nav class="navbar">
    <div class="navbar-brand">
      <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
      <span class="brand-text">Welcome to Municipal SWD!</span>
    </div>
    <div class="navbar-links">
      <router-link to="/temlpatep" class="nav-link">Home</router-link>
      <br>
      <router-link to="/Pwd" class="nav-link">Assistance</router-link>
      <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
      <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
      <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
      <router-link to="/Status" class="nav-link">Status</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>
  </nav>
      <div class="spacer"></div>
    <div class="status-page">
      <h1 class="header">Status Page</h1>
      <div v-if="editing">
        <input type="text" v-model="newStatus" class="status-input" placeholder="Enter new status">
        <button @click="saveStatus" class="action-button">Save</button>
        <button @click="cancelEdit" class="action-button">Cancel</button>
      </div>
      <div v-else>
        <div v-if="status" class="status-info">
          <p><strong>Status:</strong> {{ status }}</p>
          <button @click="editStatus" class="action-button">Edit</button>
        </div>
        <div v-else class="no-status">
          <p>No status available.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Status',
    props: {
      initialStatus: String // Define a prop to receive the initial status from the admin
    },
    data() {
      return {
        status: this.initialStatus, // Initialize status with the initial value
        newStatus: this.initialStatus, // Initialize newStatus with the initial value
        editing: false // Flag to indicate whether the status is being edited
      };
    },
    methods: {logout() {
        // Perform logout actions (e.g., clear session, redirect to login page)
        // You need to replace '/login' with the correct path to your login page
        this.$router.push('/');
      },
   
      editStatus() {
        this.editing = true; // Set editing mode to true to enable editing
      },
      saveStatus() {
        // Save the new status (e.g., send it to the server)
        // Here, we'll just update the local state for demonstration purposes
        this.status = this.newStatus;
        this.editing = false; // Exit editing mode
        // You can emit an event to notify the parent component about the status change
        this.$emit('status-updated', this.newStatus);
      },
      cancelEdit() {
        // Cancel editing and revert back to the initial status
        this.newStatus = this.status;
        this.editing = false;
      }
    }
  };
  </script>
  
  <style scoped>.spacer {
    height: 100px; /* Adjust the height for desired spacing */
  }
  .status-page {
    padding: 20px;
  }
  
  .header {
    color: #333;
    text-align: center;
  }
  
  .status-info {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
  }
  
  .status-input {
    width: 300px;
    padding: 8px;
    margin-right: 10px;
  }
  
  .no-status {
    margin-top: 20px;
    text-align: center;
    color: #666;
  }
  
  .action-button {
    padding: 8px 16px;
    margin-top: 10px;
    background-color: #336699;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #254e77;
  }
  </style>
  