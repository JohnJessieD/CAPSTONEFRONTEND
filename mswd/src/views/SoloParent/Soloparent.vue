<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Solo Parent!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/SoloTemplate" class="nav-link">Home</router-link>
        <router-link to="/Soloparent" class="nav-link">Assistance</router-link>
        <router-link to="/SoloEvents" class="nav-link">Upcoming Events</router-link>
        <router-link to="/SoloServices" class="nav-link">Services</router-link>
        <router-link to="/Solopublications" class="nav-link">Publications</router-link>
        <button class="logout-button" @click="logout">Sign Out</button>
      </div>
    </nav>
    <div class="container">
      <div class="spacer"></div>
   <form class="application-form" @submit.prevent="submitApplication">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="applicantName" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="applicantEmail" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea id="address" v-model="address" required></textarea>
        </div>
        <div class="form-group">
          <label for="numberOfChildren">Number of Children:</label>
          <input type="number" id="numberOfChildren" v-model="numberOfChildren" required>
        </div>
        <!-- Removed income proof input field -->
        <button type="submit" class="submit-button">Apply for Cash Assistance</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      applicantName: '',
      applicantEmail: '',
      phoneNumber: '',
      address: '',
      numberOfChildren: 0,
    };
  },
  methods: {
    submitApplication() {
      // Prepare form data
      const formData = new FormData();
      formData.append('applicantName', this.applicantName);
      formData.append('applicantEmail', this.applicantEmail);
      formData.append('phoneNumber', this.phoneNumber);
      formData.append('address', this.address);
      formData.append('numberOfChildren', this.numberOfChildren);

      // Send POST request using Axios
      axios.post('/api/submit-application', formData)
        .then(response => {
          // Handle successful response
          alert('Your application has been submitted successfully.');
          // Reset form fields
          this.resetForm();
        })
        .catch(error => {
          // Handle error
          console.error('Error submitting application:', error);
          // Optionally, you can show an error message to the user
        });
    },
    resetForm() {
      // Reset form fields
      this.applicantName = '';
      this.applicantEmail = '';
      this.phoneNumber = '';
      this.address = '';
      this.numberOfChildren = 0;
    },
    logout() {
      // Perform logout actions (e.g., clear session, redirect to login page)
      // You need to replace '/login' with the correct path to your login page
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* CSS for modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.spacer {
    height: 100px; /* Adjust the height for desired spacing */
  }
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.services {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="file"] {
  margin-top: 5px;
}

.submit-button,
.proceed-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover,
.proceed-button:hover {
  background-color: #45a049;
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